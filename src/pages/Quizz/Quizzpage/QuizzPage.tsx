import { useEffect, useState } from "react";
import QuestionCard from "./Questioncard";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import Timer from "./Timer";
import QuizzRisponsive from "./QuizzRisponsive";
import SubmitedView from "../../tools/SubmitedView";

interface Question {
  _id: number;
  question: string;
  questionsOptions: string[];
}

function QuizzPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submittedAnswer, setSubmittedAnswer] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [quizISubmitted, setQuizIsSubmitted] = useState<boolean>(() => {
    const stored = localStorage.getItem("quizSubmitted");
    return stored === "true";
  });

 

  const handelSubmitQuizz = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}api/v1/quiz/submitquiz`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(submittedAnswer),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit quiz");
      }
      localStorage.setItem("quizSubmitted", "true")
      setQuizIsSubmitted(true)
  
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_URL}api/v1/quiz/getquiz`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch quiz data");
        }

        const data = await response.json();
        setQuestions(data.quizzData[data.quizzData.length - 1]);

        // Initialize submitted answers array
        if (data.quizzData.length > 0) {
          const quizLength = data.quizzData[data.quizzData.length - 1].length;
          setSubmittedAnswer(new Array(quizLength).fill("not answered"));
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  if(quizISubmitted){
    return <SubmitedView 
    Heading="Quiz complete 🎉"
    Description="You've completed your quiz, You can't modify your answers anymore."
    urlto="/domainselected/dashboard/quizz"
    />
  }


  const handleAnswerSelect = (
    questionId: number,
    answerIndex: number | null
  ) => {
    setAnswers((prev) => {
      const updated = { ...prev };

      if (answerIndex === null) {
        delete updated[questionId];
      } else {
        updated[questionId] = answerIndex;
      }

      return updated;
    });

    setSubmittedAnswer((prev) => {
      const updated = [...prev];
      if (answerIndex !== null && questions.length > 0) {
        updated[questionId - 1] =
          questions[questionId - 1].questionsOptions[answerIndex];
      } else {
        updated[questionId - 1] = "not answered";
      }
      return updated;
    });
   
  };

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  
  // ✅ Don't access until loaded
  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col gap-2 justify-center items-center bg-gradient-to-r from-orange-50 via-neutral-100 to-yellow-100">
        <Loader2 className="text-amber-700 animate-spin w-5 h-5" />
        <span className="text-amber-700 font-mono">Please wait...</span>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="w-full h-screen flex  justify-center items-center bg-gradient-to-r from-orange-50 via-neutral-100 to-yellow-100">
        <span className="text-amber-700 font-mono">
          No Quiz Questions Found
        </span>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion - 1];

  return (
    <section className="w-full h-auto lg:h-screen    lg:bg-gradient-to-r from-orange-50 via-neutral-100 to-yellow-100">
      <div className="w-full h-[10%] flex justify-between items-center !pr-2 !pl-2 ">
        <Timer max={20} />

        <span>
          <button
            onClick={handelSubmitQuizz}
            className="bg-amber-300 text-amber-800 text-[0.9rem] font-medium !py-2 !px-3 rounded-sm  cursor-pointer shadow-sm hover:shadow-md"
          >
            Finish
          </button>
        </span>
      </div>
      <div className="lg:flex lg:flex-row flex justify-center items-center flex-col h-[90%] ">
        {/* Main content - 70% */}
        <div className="w-full lg:w-[70%] h-full hidden lg:flex lg:flex-col justify-center items-center gap-10 !px-2">
          <QuestionCard
            question={currentQuestionData.question}
            options={currentQuestionData.questionsOptions}
            selectedAnswer={answers[currentQuestion] ?? null}
            onAnswerSelect={(answerIndex) =>
              handleAnswerSelect(currentQuestion, answerIndex)
            }
            questionNumber={currentQuestion}
            totalQuestions={questions.length}
          />
        </div>
        {/* Mobile view */}
        <div className="flex flex-col justify-center !p-1 gap-3 items-center w-full h-full lg:hidden">
          {questions.map((question, index) => (
            <QuizzRisponsive
              key={question._id}
              question={question.question}
              options={question.questionsOptions}
              selectedAnswer={answers[index + 1] ?? null}
              onAnswerSelect={(answerIndex) =>
                handleAnswerSelect(index + 1, answerIndex)
              }
              questionNumber={index + 1}
              totalQuestions={questions.length}
            />
          ))}
        </div>

        {/* Sidebar - 30% */}
        <div className="lg:w-[30%]  w-full  h-full  !pr-2  hidden lg:flex justify-center items-center ">
          <div className="w-full h-full bg-neutral-50 lg:h-[90%] border flex flex-col justify-between  items-center border-yellow-400 lg:shadow-md rounded-md !p-4">
            <div className="w-full  rounded-md  flex justify-start items-center flex-wrap gap-4 ">
              {Array.isArray(questions) &&
                questions.length > 0 &&
                questions.map((question, index) => (
                  <div
                    key={question._id}
                    className="flex flex-col font-mono justify-center items-center"
                  >
                    <div
                      className={`shadow-md w-8 h-8 flex justify-center items-center rounded-md ${
                        answers[index + 1] !== undefined
                          ? "bg-green-300"
                          : "bg-gray-200"
                      }`}
                    >
                      {answers[index + 1] !== undefined ? (
                        <Check className="text-green-700 w-6 h-6" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            <div className="w-full h-[20%] flex flex-col   justify-center items-start gap-6 ">
              <span className="bg-amber-100 !p-1 rounded-md">
                <span className="text-[1rem] font-medium text-amber-800 ">
                  Questions answered
                </span>
                <span className="!pl-2 font-medium font-mono">
                  :{Object.keys(answers).length} out of {"10"}
                </span>
              </span>

              <span className="bg-amber-100 !p-1 rounded-md">
                <span className="text-[1rem] font-medium text-amber-800 ">
                  Questions Unanswered
                </span>
                <span className="!pl-2 font-medium font-mono">
                  :{questions.length - Object.keys(answers).length}
                </span>
              </span>
            </div>

            {/* Navigation */}
            <div className="w-full   flex justify-center items-center  !pb-5  rounded-full">
              <div className="flex items-center w-full justify-center  gap-10">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 1}
                  className={`flex items-center !px-3 !py-1  rounded-full font-medium transition-all duration-200 ${
                    currentQuestion === 1
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-neutral-50 text-neutral-800 border shadow-md hover:shadow-lg hover:bg-neutral-100"
                  }`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() => handleAnswerSelect(currentQuestion, null)}
                  className="text-[0.8rem] text-nowrap !px-3 !py-1 md:text-[1rem] rounded-full cursor-pointer bg-red-100 text-red-600 font-medium hover:bg-red-200 transition"
                >
                  Clear option
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentQuestion === questions.length}
                  className={`flex items-center  !px-3 !py-1  rounded-full font-medium transition-all duration-200 ${
                    currentQuestion === questions.length
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-yellow-300 text-gray-700 shadow-md hover:shadow-lg hover:bg-yellow-400"
                  }`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuizzPage;
