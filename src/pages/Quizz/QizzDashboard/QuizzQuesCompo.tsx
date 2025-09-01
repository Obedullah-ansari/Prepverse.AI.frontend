import React from "react";
import { Check, CircleX, Info, CircleAlert } from "lucide-react";

interface QuizQuestionType {
  question: string;
  correctAnswere: string;
  userAnswer: string;
  explanation: string;
}

const QuizzQuesCompo: React.FC<QuizQuestionType> = ({
  question,
  correctAnswere,
  userAnswer,
  explanation,
}) => {
  return (
    <div className="bg-white  max-w-[95%] w-full h-auto rounded-xl shadow-md !p-6 !mb-6 border border-gray-200 ">
      <h3 className="text-md font-medium text-gray-800  !mb-4">{question}</h3>

      <div className="!space-y-3 !mb-5">
        <div className="flex items-start gap-3 !p-3 bg-green-50  rounded-lg">
          <Check className="text-green-500  mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-green-700">Correct Answer</p>
            <p className="text-green-600 ">{correctAnswere}</p>
          </div>
        </div>

        <div
          className={`flex items-start gap-3  !p-3  ${
            userAnswer === correctAnswere ? "bg-green-50" : "bg-red-50 "
          } ${userAnswer==="not answered" && "bg-yellow-200/50"  } rounded-lg `}
        >
          {userAnswer === correctAnswere ? (
            <Check className="text-green-500  mt-0.5 flex-shrink-0" />
          ) : userAnswer === "not answered" ? (
            <CircleAlert className="text-yellow-500  mt-0.5 flex-shrink-0" />
          ) : (
            <CircleX className="text-red-500  !mt-0.5 flex-shrink-0" />
          )}
          {userAnswer === correctAnswere ? (
            <div>
              <p className="font-medium text-green-700">Your Answer</p>
              <p className="text-green-600 ">{userAnswer}</p>
            </div>
          ) : userAnswer === "not answered" ? (
            <div>
              <p className="font-medium text-yellow-600">Not Answered</p>
              <p className="text-yellow-600 ">You skipped this question</p>
            </div>
          ) : (
            <div>
              <p className="font-medium text-red-600">Your Answer</p>
              <p className="text-red-400">{userAnswer}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50  rounded-lg !p-4">
        <div className="flex items-center gap-2 !mb-2 text-blue-600 ">
          <Info className="w-5 h-5" />
          <h4 className="font-semibold">Explanation</h4>
        </div>
        <p className="text-gray-700 ">{explanation}</p>
      </div>
    </div>
  );
};

export default QuizzQuesCompo;
