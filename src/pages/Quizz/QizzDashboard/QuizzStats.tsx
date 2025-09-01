import React, { useState, useEffect } from "react";
import PiChart from "./Chart";
import BarChart from "./BarChart";

interface QuestionCorrectSummmary {
  correctAnswer: string;
  wrongAnswer: string;
  skippedQuestion: string;
}

const QuizzStats: React.FC<{ heading: string }> = ({ heading }) => {
  const [questionCorrectSummary, setQuestionCorrectSummary] =
    useState<QuestionCorrectSummmary>({
      correctAnswer: "0",
      wrongAnswer: "0",
      skippedQuestion: "0",
    });

  useEffect(() => {
    const data = localStorage.getItem("questionCorrectSummary");
    if (data) {
      setQuestionCorrectSummary(JSON.parse(data));
    }
  }, []);

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

        <div className="overflow-y-auto h-full w-full sm:flex sm:flex-col  lg:flex lg:flex-row justify-center items-center gap-10 ">
          <div className="flex flex-col justify-center  overflow-hidden   items-center  w-auto h-auto md:w-[25rem]  md:h-[30rem] ">
            <span className="text-xl font-mono text-neutral-800 !p-2 ">
              Quiz Summary
            </span>
            <PiChart
              correct={Number(questionCorrectSummary.correctAnswer)}
              wrong={Number(questionCorrectSummary.wrongAnswer)}
              skipped={Number(questionCorrectSummary.skippedQuestion)}
            />
          </div>

          <div className="flex flex-col justify-center  overflow-hidden      items-center w-auto h-auto md:w-[30rem]  md:h-[30rem] ">
            <span className="text-xl font-mono text-neutral-800 !p-2 ">
              Total Time Taken
            </span>
            <BarChart expectedTime={20} timeTaken={19} />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizzStats;
