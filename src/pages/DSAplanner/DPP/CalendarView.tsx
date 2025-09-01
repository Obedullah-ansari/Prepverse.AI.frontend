import React from "react";
import { cn } from "../../../lib/utils";

interface CalendarDay {
  date: number;
  isToday: boolean;
}

interface MonthData {
  name: string;
  year: number;
  days: CalendarDay[];
}

const generateMonthData = (
  year: number,
  month: number,
  today: Date
): MonthData => {
  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: CalendarDay[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    days.push({
      date: day,
      isToday,
    });
  }

  return { name: monthName, year, days };
};

const getAllMonthsBetween = (start: Date, end: Date): MonthData[] => {
  const months: MonthData[] = [];
  const current = new Date(start.getFullYear(), start.getMonth(), 1);
  const today = new Date();

  while (
    current.getFullYear() < end.getFullYear() ||
    (current.getFullYear() === end.getFullYear() &&
      current.getMonth() <= end.getMonth())
  ) {
    months.push(
      generateMonthData(current.getFullYear(), current.getMonth(), today)
    );
    current.setMonth(current.getMonth() + 1);
  }

  return months;
};

const Calendar: React.FC<{
  month: MonthData;
  onDaySelected: (type: string) => void;
}> = ({ month, onDaySelected }) => {
  const handelDate = (date: string) => {
    const [day, monthName, year] = date.split("/");

    const dateObj = new Date(`${monthName} ${day}, ${year} UTC`);
    const isoString = dateObj.toISOString();
  

    onDaySelected(isoString);
  };

  return (
    <div className="!space-y-4 !p-4  bg-neutral-50 rounded-md w-full md:w-[17rem] h-auto shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 text-center">
        {month.name} {month.year}
      </h3>

      <div className="grid grid-cols-7 gap-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            className="text-xs font-medium text-gray-500 text-center p-2"
          >
            {day}
          </div>
        ))}

        {month.days.map((day, dayIndex) => (
          <div
          onClick={() =>
            handelDate(`${day.date}/${month.name}/${month.year}`)
          }
            key={dayIndex}
            className={cn(
              "aspect-square cursor-pointer flex items-center justify-center text-sm rounded-lg bg-slate-100/50",
              day.isToday && "ring-1 ring-blue-500 bg-blue-400 ring-offset-1",
             
            )}
          >
            <div
              className="flex  flex-col items-center"
            >
              <span>{day.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CalendarView: React.FC<{
  startDate: string;
  endDate: string;
  onDaySelected: (type: string) => void;
}> = ({ startDate, endDate, onDaySelected }) => {
  const months = getAllMonthsBetween(new Date(startDate), new Date(endDate));

  return (
    <div className=" h-auto w-full flex flex-wrap justify-center lg:justify-start items-center gap-8">
      {months.map((month, index) => (
        <Calendar key={index} month={month} onDaySelected={onDaySelected} />
      ))}
    </div>
  );
};
