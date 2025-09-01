import React, { useState, useEffect } from "react";
import QuizzQuesCompo from "./QuizzQuesCompo";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface QuizQuestion {
  question: string;
  correctAnswere: string;
  userAnswer: string;
  explanation: string;
}

const QuizzSummary: React.FC<{
  heading: string;
}> = ({ heading }) => {
  const [allQizzData, SetallQuizData] = useState<QuizQuestion[][]>([]);
  const [quizOptionIndex, SetQuizOptionIndex] = useState<number>();
  const [quizzSummary, SetquizzSummary] = useState<QuizQuestion[]>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handelNextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
  };
  const handelPrevQuestion = () => {
    setCurrentIndex((prev) => prev - 1);
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
        // ✅ Set full quiz data (not just the last one)
        SetallQuizData(data.quizzData);
        SetquizzSummary(data.quizzData[data.quizzData.length - 1]);
        SetQuizOptionIndex(data.quizzData.length - 1); // Set the index to the last quiz by default
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, []);

  const handelChangeQuizz = (index: number) => {
    SetQuizOptionIndex(index);
    if (Array.isArray(allQizzData) && allQizzData.length > 0) {
      SetquizzSummary(allQizzData[index]);
      setCurrentIndex(0); // Reset to the first question of the selected quiz
    }
  };

  useEffect(() => {
    let correctAnswer = 0;
    let wrongAnswer = 0;
    let skippedQuestion = 0;
    {
      Array.isArray(quizzSummary) &&
        quizzSummary.length > 0 &&
        quizzSummary.forEach((quizCheck) => {
          if (quizCheck.userAnswer === quizCheck.correctAnswere) {
            correctAnswer += 1;
          } else if (
            quizCheck.userAnswer !== quizCheck.correctAnswere &&
            quizCheck.userAnswer !== "not answered"
          ) {
            wrongAnswer += 1;
          } else if ((quizCheck.userAnswer = "not answered")) {
            skippedQuestion += 1;
          }
        });
    }
    localStorage.setItem("questionCorrectSummary", JSON.stringify({
      correctAnswer: correctAnswer,
      wrongAnswer: wrongAnswer,
      skippedQuestion: skippedQuestion
    }));
  }, [quizzSummary]);

  return (
    <>
      <div className="w-full h-auto  flex flex-col">
        {/* Top bar */}
        <div className="w-full  sticky top-0 left- bg-neutral-50 flex border-b border-slate-200 h-[5rem]">
          <div className="md:w-[30%] h-full flex justify-start !pl-5 !pb-1 items-end">
            <span className="text-2xl text-nowrap font-medium">{heading}</span>
          </div>
          <div className="md:w-[70%] w-full h-full  flex  justify-end !px-2 items-end !pb-1  "></div>
        </div>
        <div className="overflow-y-auto w-full">
          <div className=" w-full h-[10vh] !p-10   flex items-center gap-4  ">
            <label className="text-gray-700 font-semibold text-base !mr-3">
              History of Quizzes
            </label>
            <select
              value={quizOptionIndex}
              onChange={(e) => handelChangeQuizz(Number(e.target.value))}
              className="!px-4 !py-2 !pr-8 rounded-lg border bg-amber-100 cursor-pointer  border-amber-300 focus:ring-1 focus:ring-amber-600 focus:shadow-sm focus:shadow-amber-600 focus:border-none focus:outline-none text-gray-800  appearance-none transition-all duration-200 hover:border-amber-500"
            >
              {Array.isArray(quizzSummary) &&
                allQizzData.map((item, index) => (
                  <option key={index} value={index}>
                    {index + 1}:{" "}
                    {item[0]?.question?.split(" ").slice(0, 5).join(" ") +
                      "..."}
                  </option>
                ))}
            </select>
          </div>

          <div className=" w-full  !pt-10 flex flex-col   items-center">
            {Array.isArray(quizzSummary) && quizzSummary.length > 0 && (
              <QuizzQuesCompo
                question={quizzSummary[currentIndex].question}
                correctAnswere={quizzSummary[currentIndex].correctAnswere}
                userAnswer={quizzSummary[currentIndex].userAnswer}
                explanation={quizzSummary[currentIndex].explanation}
              />
            )}
          </div>
          <div className="w-full h-auto flex gap-10 justify-center !p-4  items-center">
            <button
              disabled={currentIndex === 0 ? true : false}
              className="!px-4 !py-1 bg-neutral-100 cursor-pointer rounded-full text-center shadow-md "
              onClick={handelPrevQuestion}
            >
              <ChevronLeft className="text-neutral-800" />
            </button>
            <button
              className="!px-4 !py-1 bg-neutral-100 cursor-pointer rounded-full text-center shadow-md "
              disabled={
                Array.isArray(quizzSummary) &&
                currentIndex === quizzSummary.length - 1
                  ? true
                  : false
              }
              onClick={handelNextQuestion}
            >
              <ChevronRight className="text-neutral-800" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizzSummary;
