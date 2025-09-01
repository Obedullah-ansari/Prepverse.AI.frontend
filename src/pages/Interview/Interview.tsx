import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Boticon from "./Boticon";
import Boticontwo from "./Boticontwo";
import Webcam from "react-webcam";
import { UserCircle2, MicOffIcon } from "lucide-react";

interface InterviewDetails {
  answer: string;
  question: string;
}

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 20,
    },
  },
};

const Interview: React.FC<{}> = () => {
  
  const [interviewQuestion, setInterviewQestion] =
    useState<InterviewDetails[]>();
  const [recording, setRecording] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
    () => {
      const savedIndex = localStorage.getItem("currentQuestionIndex");
      return savedIndex ? parseInt(savedIndex, 10) : 0;
    }
  );
  const [textLoading, setTextLoading] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [hasWebcamAccess, setHasWebcamAccess] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    localStorage.setItem("currentQuestionIndex", String(currentQuestionIndex));
  }, [currentQuestionIndex]);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_URL}api/v1/auth/interviewdetails/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setInterviewQestion(data.interviewQuestions);
        } else {
          console.log("Server responded with error:", data);
        }
      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    };

    fetchInterviewDetails();
  }, []);

  const handleRecording = async () => {
    if (!recording) {
      setTextLoading(() => false);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioFile = new File([blob], "recording.webm");

        const formData = new FormData();
        formData.append("audio", audioFile);

        try {
          const response = await fetch(
            `${import.meta.env.VITE_APP_URL}api/v1/auth/useranswer`,
            {
              method: "POST",
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: formData,
            }
          );

          const data = await response.json();
          if (response.ok) {
            setTextLoading(false);
            setCurrentQuestionIndex((prev) => prev + 1);
            if (
              interviewQuestion &&
              currentQuestionIndex + 1 < interviewQuestion.length
            ) {
              const nextText =
                interviewQuestion[currentQuestionIndex + 1].question;
              const nextUtterance = new SpeechSynthesisUtterance(nextText);
              nextUtterance.lang = "en-US";
              window.speechSynthesis.cancel();
              window.speechSynthesis.speak(nextUtterance);
              setTextLoading(true);
            }
          } else {
            console.log("Server error:", data);
          }
        } catch (error) {
          console.error("Upload error:", error);
        }
      };

      mediaRecorder.start();
      setRecording(true);
    } else {
      mediaRecorderRef.current?.stop();
      setRecording(false);
    }
  };

  const speakAllQuestions = () => {
    if (interviewQuestion && interviewQuestion.length > 0) {
      const text = interviewQuestion[currentQuestionIndex].question;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
      setTextLoading(true);
    }
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        setHasWebcamAccess(true);
      })
      .catch((error) => {
        console.error("Webcam access denied:", error);
        setHasWebcamAccess(false);
      });
  }, []);

  

  return (
    <>
      <div className="w-full h-[100vh] bg-neutral-900 flex">
        <div className="w-[70%]  flex flex-col justify-center  items-center ">
          <div className="w-full flex flex-col justify-center items-center h-[89%]  overflow-hidden">
            <div className="w-full h-[30%] !p-2 flex justify-center items-center gap-2">
              <Boticon botname="hr" isrecording={textLoading} />
              <Boticontwo botname="Alex" />
            </div>
            {hasWebcamAccess ? (
              <Webcam
                audio={false}
                className={`w-[80%] h-[70%] object-cover rounded-md border ${
                  recording
                    ? "border-green-300  shadow-md shadow-green-500"
                    : "border-neutral-800"
                }`}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "user",
                }}
                style={{
                  transform: "scaleX(-1)",
                }}
              />
            ) : (
              <div
                className={`w-[80%] h-[70%] flex justify-center items-center  rounded-md border 
                  bg-teal-500 bg-[radial-gradient(circle,#17a589,#76d7c4,#a3e4d7)]
                  ${
                  recording
                    ? "border-green-300  shadow-md shadow-green-500"
                    : "border-neutral-800"
                }`}
              >
                <UserCircle2
                  className="w-[10rem] h-[10rem] text-gray-700  rounded-full"
                />
              </div>
            )}
          </div>
          <div className="w-full h-[11%]  flex items-center justify-center">
            <button
              // className={`${
              //   recording ? "bg-red-500" : "bg-green-500"
              // }  rounded-full  w-auto h-auto `}
              onClick={handleRecording}
            >
              {recording ? (
                <MicOffIcon className="w-8 h-8 text-red-400" />
              ) : (
                <img
                  src="https://i.pinimg.com/originals/3f/d2/23/3fd22342b0a9f3e4ef3d4d46d16ce13a.gif"
                  alt="record"
                  className="w-14 h-14"
                />
              )}
            </button>

            <button
              className="ml-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={speakAllQuestions}
            >
              start
            </button>
          </div>
        </div>
        <div className="w-[30%] flex flex-col justify-start items-center !p-4  border-l border-neutral-800 ">
          <div className="w-full !p-3 h-[60%] rounded-3xl bg-neutral-800  ">
            {Array.isArray(interviewQuestion) &&
              interviewQuestion.length > 0 &&
              textLoading && (
                <div className="w-full ">
                  <UserCircle2
                    color="#5f6a6a"
                    className="w-12 h-12  rounded-full"
                  />
                  <motion.div
                    key={`${currentQuestionIndex}-${textLoading}`}
                    className="text-[1rem] text-neutral-200 flex  flex-wrap "
                    variants={sentence}
                    initial="hidden"
                    animate="visible"
                  >
                    {interviewQuestion![currentQuestionIndex].question
                      .split(" ")
                      .map((char, index) => (
                        <motion.span
                          key={index}
                          variants={letter}
                          className="!mr-[0.6rem]"
                        >
                          {char}
                        </motion.span>
                      ))}
                  </motion.div>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Interview;
