import React, { useState,useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  SkipForward,
  TrendingUp,
  Clock,
} from "lucide-react";

const TopStatBar: React.FC<{
  totalWeeks: number;
  skippedDays: number;
  currentWeekNumber :number;
}> = ({ totalWeeks , skippedDays ,currentWeekNumber}) => {
    
  const [currentWeek, setCurrentWeek] = useState<number>(currentWeekNumber);
    
  useEffect(() => {
    setCurrentWeek(currentWeekNumber);
  }, [currentWeekNumber])


  // Calculate progress
  const progressRate = Math.round((currentWeek / totalWeeks) * 100);
  const weeksLeft = totalWeeks - currentWeek;

  // Handle week selection
  const handleWeekChange = (direction: string) => {
    if (direction === "prev" && currentWeek > 1) {
      setCurrentWeek(currentWeek - 1);
    } else if (direction === "next" && currentWeek < totalWeeks) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  return (
    <div className="bg-neutral-50   !p-4 md:!p-6  w-full !mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center">
        {/* Total Weeks */}
        <div className="bg-white !p-3 rounded-lg shadow-sm border border-neutral-100">
          <div className="flex items-center !space-x-2 text-slate-700">
            <Calendar className="h-5 w-5 text-slate-500" />
            <div>
              <p className="text-xs text-slate-500">Total Weeks</p>
              <p className="font-semibold">{totalWeeks}</p>
            </div>
          </div>
        </div>

        {/* Weeks Left */}
        <div className="bg-white !p-3 rounded-lg shadow-sm border border-neutral-100">
          <div className="flex items-center !space-x-2 text-slate-700">
            <Clock className="h-5 w-5 text-slate-500" />
            <div>
              <p className="text-xs text-slate-500">Weeks Left</p>
              <p className="font-semibold">{weeksLeft}</p>
            </div>
          </div>
        </div>

        {/* Skipped Days */}
        <div className="bg-white !p-3 rounded-lg shadow-sm border border-neutral-100">
          <div className="flex items-center !space-x-2 text-slate-700">
            <SkipForward className="h-5 w-5 text-slate-500" />
            <div>
              <p className="text-xs text-slate-500">Days Skipped</p>
              <p className="font-semibold">{skippedDays}</p>
            </div>
          </div>
        </div>

        {/* Progress Rate */}
        <div className="bg-white !p-3 rounded-lg shadow-sm border border-neutral-100">
          <div className="flex items-center !space-x-2 text-slate-700">
            <TrendingUp className="h-5 w-5 text-slate-500" />
            <div>
              <p className="text-xs text-slate-500">Progress</p>
              <p className="font-semibold">{progressRate}%</p>
            </div>
          </div>
        </div>

        {/* Current Week */}
        <div className="bg-white !p-3 rounded-lg shadow-sm border border-neutral-100 col-span-2 md:col-span-1">
          <div className="flex items-center !space-x-2 text-slate-700 justify-center">
            <div>
              <p className="text-xs text-slate-500 text-center">Current Week</p>
              <p className="font-semibold text-center">{currentWeek}</p>
            </div>
          </div>
        </div>

        {/* Week Selection */}
        <div className="bg-white !p-3 rounded-lg shadow-sm border border-neutral-100 col-span-2 md:col-span-1 flex items-center justify-between">
          <button
            onClick={() => handleWeekChange("prev")}
            disabled={currentWeek === 1}
            className={`p-1 rounded-md ${
              currentWeek === 1
                ? "text-slate-300"
                : "text-slate-600 hover:bg-neutral-100"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <span className="text-sm font-medium text-slate-700">
            Week {currentWeek}
          </span>

          <button
            onClick={() => handleWeekChange("next")}
            disabled={currentWeek === totalWeeks}
            className={`!p-1 rounded-md ${
              currentWeek === totalWeeks
                ? "text-slate-300"
                : "text-slate-600 hover:bg-neutral-100"
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Progress Bar - Only visible on larger screens */}
      <div className="hidden md:block !mt-4">
        <div className="w-full bg-neutral-200 rounded-full h-2.5">
          <div
            className="bg-blue-500/20 h-2.5 rounded-full"
            style={{ width: `${progressRate}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Week 1</span>
          <span>Week {totalWeeks}</span>
        </div>
      </div>
    </div>
  );
};

export default TopStatBar;
