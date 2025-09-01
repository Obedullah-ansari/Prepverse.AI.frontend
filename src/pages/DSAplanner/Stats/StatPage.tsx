import React, { useEffect, useState } from "react";
import TotalQuestionChart from "./TotalQuestionChart";
import UserDoneQuestions from "./UserDoneQuestions";
import WeeklyBarChart from "./weeklyBarChart";
import LineChart from "./LineChartProps";
import TopStatBar from "./TopStatBar";

export interface WeekStatType {
  weekNumber: number;
  totalDiffcultyQuestionPerWeek: {
    easy: number;
    medium: number;
    hard: number;
  };
  totalTimeSpentPerWeek: number;
  totalQuestionsCoutPerWeek: number;
  expectedTimePerDay: number[];
  timeSpentPerDay: number[];
  questionsCompleteCoutPerDay: number;
  dailyDiffcultyQuestionCount: {
    easy: number;
    medium: number;
    hard: number;
  };
  totalQuestionPerDay: number;
}
export interface TopStatBarDataType {
  totalWeeks: number,
  weekLeft : number,
  skippedDays : number,
}

const StatPage: React.FC<{ heading?: string }> = ({ heading }) => {
  const labels = [
    "Day 1",
    "Day 2",
    "Day 3",
    "Day 4",
    "Day 5",
    "Day 6",
    "Day 7",
  ];
  const idealData = [10, 10, 10, 10, 10, 10, 10];
  const actualData = [10, 12, 14, 15, 16, 17, 18];

  const [dailyProgressData, setDailyProgressData] = useState<WeekStatType>();
  const [topStatBarData, setTopStatBarData] = useState<TopStatBarDataType>()

  useEffect(() => {
    const fetchDailyUserProgress = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_URL}api/v1/dsa/dailyprogressinfo`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          setDailyProgressData(
            data.dailyProgressData.weeklyProgress[
              data.dailyProgressData.weeklyProgress.length - 1
            ]
          );

          setTopStatBarData({
            totalWeeks: data.dailyProgressData.totalWeeks ,
            weekLeft:data.dailyProgressData.weekLeft ,
            skippedDays: data.dailyProgressData.skippedDays, 
          })
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDailyUserProgress();
  }, []);

  

  return (
    <div className="relative w-full h-auto bg-neutral-50  flex flex-col">
      {/* Top bar */}
      <div className="w-full sticky  top-0 left-0  bg-neutral-50  border-b border-slate-200 h-[5rem]">
        <div className="w-[20%]  h-full flex justify-start !pl-5 items-end">
          <span className="text-3xl font-medium">{heading}</span>
        </div>
        <div className="w-[80%] h-full flex justify-center items-center gap-3"></div>
      </div>

      <TopStatBar 
      totalWeeks={topStatBarData?.totalWeeks ||0} 
      skippedDays={topStatBarData?.skippedDays ||0}
      currentWeekNumber={dailyProgressData?.weekNumber||0}
      />

      {/* Main content */}
      <div className=" w-full sm:h-auto  max-sm:h-auto md:h-[90vh] !p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 h-full auto-rows-fr grid-flow-dense">
        {/* Square 1 - Top Left */}
        <div className="bg-neutral-100 overflow-hidden rounded-lg max-sm:h-auto shadow-md !p-3 md:row-span-2 md:col-span-1">
          <div className="h-full w-full flex  flex-col items-center justify-center">
            <span className="font-medium text-slate-600 !pb-3   ">
              Questions Plan Of This Week
            </span>
            <TotalQuestionChart
              easy={dailyProgressData?.totalDiffcultyQuestionPerWeek.easy || 0}
              medium={
                dailyProgressData?.totalDiffcultyQuestionPerWeek.medium || 0
              }
              hard={dailyProgressData?.totalDiffcultyQuestionPerWeek.hard || 0}
            />
          </div>
        </div>

        {/* Rectangle 1 - Top Right (spans 2 cols on md+) */}
        <div className="bg-neutral-100 rounded-lg max-sm:h-auto shadow-sm  md:row-span-2 md:col-span-1 lg:col-span-2">
          <div className="h-full flex flex-col items-center justify-center">
            <div className=" flex justify-center items-center gap-5 ">
              <span className="font-medium  text-slate-600 ">This Week</span>
              <span className="font-semibold text-2xl text-slate-600 ">
                3h 20m
              </span>
              <span></span>
              <span></span>
            </div>
            <WeeklyBarChart
              expectedTime={dailyProgressData?.expectedTimePerDay || []}
              timeTaken={dailyProgressData?.timeSpentPerDay || []}
              startDate={new Date("2025-06-1")}
            />
          </div>
        </div>

        {/* Square 2 - Bottom Left */}
        <div className="bg-neutral-100 rounded-lg max-sm:h-auto shadow-sm  md:row-span-2 lg:col-span-2">
          <div className="h-full flex items-center justify-center">
            <LineChart
              labels={labels}
              idealData={idealData}
              actualData={actualData}
            />
          </div>
        </div>

        {/* Rectangle 2 - Bottom Right (spans 2 cols on md+) */}
        <div className="bg-neutral-100 rounded-lg max-sm:h-auto shadow-md  md:row-span-2  md:col-span-1 lg:col-span-1">
          <div className="h-full flex flex-col items-center justify-center">
            <UserDoneQuestions
              easy={dailyProgressData?.dailyDiffcultyQuestionCount.easy || 0}
              medium={
                dailyProgressData?.dailyDiffcultyQuestionCount.medium || 0
              }
              hard={dailyProgressData?.dailyDiffcultyQuestionCount.hard || 0}
              totalquestiondone={dailyProgressData?.totalQuestionPerDay || 0}
              totalQuestionsCoutPerWeek={
                dailyProgressData?.totalQuestionsCoutPerWeek || 0
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatPage;
