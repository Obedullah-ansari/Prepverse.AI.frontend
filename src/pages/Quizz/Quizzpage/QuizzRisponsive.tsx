import React from 'react';
import { cn } from '../../../lib/utils';

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuizzRisponsive: React.FC<QuestionCardProps> = ({
  question,
  options,
  selectedAnswer,
  onAnswerSelect,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div className=" border border-amber-400 bg-neutral-50  rounded-xl shadow-lg w-full h-[90%]  !p-8  flex flex-col">
      <div className="!mb-6 h-auto  w-full">
        <div className="flex items-center justify-between !mb-4">
          <span className="text-[0.8rem] md:text-sm font-medium text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <h2 className=" text-[0.8rem] md:text-[1rem] font-medium  text-gray-800 leading-relaxed">
          {question}
        </h2>
      </div>

      <div className="flex-1 w-full !space-y-6 h-auto text-[0.8rem] md:text-[1rem]  ">
        {Array.isArray(options) && options.length >0 && options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={cn(
              "w-full !p-2 md:!p-4 text-left rounded-full border cursor-pointer transition-all duration-200 hover:shadow-md",
              selectedAnswer === index
                ? "border-yellow-400 bg-yellow-50 shadow-md"
                : "border-gray-200 bg-gray-50 hover:border-slate-300 hover:bg-gray-100"
            )}
          >
            <div className="flex items-center !space-x-3">
              <div
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium",
                  selectedAnswer === index
                    ? "border-yellow-400 bg-yellow-400 text-white"
                    : "border-gray-300 text-gray-500"
                )}
              >
                {String.fromCharCode(65 + index)}
              </div>
              <span className="text-gray-700 font-medium">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizzRisponsive;