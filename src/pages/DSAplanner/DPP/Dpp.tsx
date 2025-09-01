import React from "react";
import { CalendarView } from "./CalendarView";
import TaskCard from "./TaskCard";
import { useEffect, useState } from "react";
import Timer from "./Timer";
import { LockKeyhole } from "lucide-react";

interface Question {
  title: string;
  link: string;
  difficulty: "easy" | "medium" | "hard";
  isCompleted: boolean;
  timeLimit: string;
  _id: string;
}

interface DayData {
  TimeSpentPerDay: number;
  dayNumber: number;
  dayDate: string;
  questions: Question[];
  _id: string;
}

interface WeeklyPlanData {
  startDuration: string;
  targetDate: string;
  weeklyPlan: DayData[];
}
interface DailyProgress {
  iscompleted: boolean;
  totalQuestionDone: number;
  totalDailyQuestions: number;
  totalEasyQuestion: number;
  totalMediumQuestion: number;
  totalHardQuestion: number;
  estimatedTime: number;
  timeTaken: number;
  questionCompletedInfo: {};
}

const Dpp: React.FC<{
  heading?: string;
}> = ({ heading }) => {
  const [weeklyPlanData, setWeeklyPlanData] = useState<WeeklyPlanData | null>(
    null
  );
  const [selectedDay, setSelectedDay] = useState<DayData | undefined>();
  const [dailyDate, setDailyDate] = useState<string>("");

  useEffect(() => {
    const getWeeklyPlanData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_URL}api/v1/dsa/getweeklyplan`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          console.log(response.status);
          return;
        }

        const data: WeeklyPlanData = await response.json();
        setWeeklyPlanData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getWeeklyPlanData();
  }, []);

  const handleDaySelect = (currentdate: string) => {
    if (!weeklyPlanData) return;

    const startingdate = new Date(weeklyPlanData.startDuration);
    const selectedDate = new Date(currentdate);

    const today = new Date();

    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ).getTime();

    const startDateOnly = new Date(
      startingdate.getFullYear(),
      startingdate.getMonth(),
      startingdate.getDate()
    ).getTime();

    const selectedDateOnly = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    ).getTime();

  

    if (todayOnly < startDateOnly) {
      setSelectedDay(undefined);
      setDailyDate(weeklyPlanData.startDuration);
      return;
    }

    // Case 2: If selected date matches start date (regardless of today)
    if (selectedDateOnly === startDateOnly) {
      setSelectedDay(weeklyPlanData.weeklyPlan[0]);
      return;
    }
     // Case 3: If selected date is valid (between start date and today)
    let tempDateCal, temp;
    if (selectedDateOnly >= startDateOnly && selectedDateOnly <= todayOnly) {
      const currentDay = weeklyPlanData.weeklyPlan.find((day) => {
        temp = new Date(day.dayDate);
        tempDateCal = new Date(
          temp.getFullYear(),
          temp.getMonth(),
          temp.getDate()
        ).getTime();
        if (tempDateCal === selectedDateOnly) return day;
      });
      setSelectedDay(currentDay);
      return;
    }

    setSelectedDay(undefined);

    // setSelectedDay(undefined);
    const dateObj = new Date(`${selectedDate} UTC`);
    const isoString = dateObj.toISOString();
    setDailyDate(isoString);
  };

  useEffect(() => {
    const today = new Date();
    const dateObj = new Date(`${today} UTC`);
    const isoString = dateObj.toISOString();

    handleDaySelect(isoString);
  }, [weeklyPlanData]);

  const handleDailyProgress = async () => {
    let completedCount = 0;
    let easy = 0;
    let medium = 0;
    let hard = 0;
    let estimatedTotaltime = 0;
    let eachQuestionCountInfo: { [key: string]: string } = {};

    selectedDay?.questions.forEach((question) => {
      estimatedTotaltime += parseInt(question.timeLimit, 10) || 0;

      if (localStorage.getItem(question.title) === "1") {
        completedCount++;

        switch (question.difficulty) {
          case "easy":
            easy++;
            break;
          case "medium":
            medium++;
            break;
          case "hard":
            hard++;
            break;
        }
      }

      eachQuestionCountInfo[question.title] =
        localStorage.getItem(question.title) || "0";
    });

    let timetakenbyuser = parseInt(
      localStorage.getItem("stopwatch-time") || "0",
      10
    );
    timetakenbyuser = Math.ceil((timetakenbyuser / 60) * 100) / 100;

    // Create local progress object
    const dailyProgressData = {
      iscompleted: completedCount === selectedDay?.questions.length,
      questionCompletedInfo: eachQuestionCountInfo,
      totalQuestionDone: completedCount,
      totalEasyQuestion: easy,
      totalMediumQuestion: medium,
      totalHardQuestion: hard,
      estimatedTime: estimatedTotaltime,
      timeTaken: timetakenbyuser,
      totalDailyQuestions: selectedDay?.questions.length || 0,
    };

    // Submit directly with accurate data
    handelSubmitDailyProgress(dailyProgressData);
  };

  const handelSubmitDailyProgress = async (progressData: DailyProgress) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}api/v1/dsa/dailyprogress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(progressData),
        }
      );

      if (!response.ok) {
        console.log(response.status);
        return;
      }

      selectedDay?.questions.forEach((question) => {
        localStorage.removeItem(question.title);
      });
      localStorage.removeItem("stopwatch-time");
      localStorage.removeItem("stopwatch-active");
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // DD/MM/YYYY format
  };

  return (
    <div className="w-full h-auto  flex flex-col">
      {/* Top bar */}
      <div className="w-full  sticky top-0 left- bg-neutral-50 flex border-b border-slate-200 h-[5rem]">
        <div className="md:w-[30%] h-full flex justify-start !pl-5 !pb-1 items-end">
          <span className="text-2xl text-nowrap font-medium">{heading}</span>
        </div>
        <div className="md:w-[70%] w-full h-full  flex  justify-end !px-2 items-end !pb-1  ">
          <span className="text-slate-500 hidden  md:block !mr-4  font-medium text-[0.9rem]">
            Submit Your Daily Progress
          </span>

          <button
            className="!px-2 !py-1 rounded-md  font-medium text-neutral-100   bg-gradient-to-r from-green-400 to bg-green-600"
            onClick={handleDailyProgress}
          >
            submit
          </button>
        </div>
      </div>

      <div className="overflow-y-auto w-full">
        <div className="h-auto lg:!pl-5 lg:!pt-2 !p-5 !mt-2 w-full">
          <CalendarView
            startDate={weeklyPlanData?.startDuration || ""}
            endDate={weeklyPlanData?.targetDate || ""}
            onDaySelected={handleDaySelect}
          />
        </div>
        <div className="relative md:flex max-sm:flex-col sm:flex-col  md:flex-row h-auto w-full">
          {selectedDay === undefined && (
            <div className="absolute  flex justify-center gap-3 items-center w-full h-full top-0 b bg-transparent  backdrop-blur-[0.3rem] ">
              <h1 className="text-slate-500 font-medium text-xl">
                This Task Will Unlock On {formatDate(dailyDate)}
              </h1>
              <LockKeyhole className="w-10 h-10 text-slate-500" />
            </div>
          )}
          <div className="h-auto w-full md:w-[75%]   !p-5 flex flex-col justify-center items-start sm:!px-2 max-sm:!px-1 md:!px-10">
            {selectedDay && (
              <>
                <div className="w-full h-auto flex justify-between items-start mb-6">
                  <p className="lg:text-2xl sm:!px-5 !pt-2 md:!px-0 text-[1rem] max-sm:text-[0.8rem] font-medium text-slate-500 font-mono">
                    Today's Practice Problems
                  </p>
                  <div className="h-auto flex flex-col justify-center items-start !pr-[14%] gap-2">
                    <span className="lg:text-4xl text-nowrap sm:text-xl md:text-xl font-medium text-slate-500">
                      <span>Day {selectedDay.dayNumber}</span>
                    </span>
                    <p className="md:text-[0.9rem] max-sm:text-[0.8rem] font-mono text-slate-500">
                      {formatDate(selectedDay.dayDate)}
                    </p>
                  </div>
                </div>

                <div className="w-full  space-y-4">
                  {selectedDay.questions.map((question) => (
                    <TaskCard
                      key={question._id}
                      title={question.title}
                      difficulty={question.difficulty}
                      timeEstimate={question.timeLimit}
                      isCompleted={question.isCompleted}
                      link={question.link}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className=" h-[20rem]  w-full md:w-[35%] !pb-5 md:!pb-0  flex justify-center items-center">
            <Timer />
          </div>
        </div>
        <p className="text-[0.8rem] font-medium text-slate-500 text-center !mt-16">
          @Please ensure you submit your daily progress before starting the next
          task. Failure to do so may result in the day being marked as missed.
        </p>
      </div>
    </div>
  );
};

export default Dpp;
