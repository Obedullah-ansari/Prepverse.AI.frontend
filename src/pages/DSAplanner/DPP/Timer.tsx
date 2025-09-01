import { useState, useEffect, useRef } from "react";

const Stopwatch = () => {
  const [timeElapsed, setTimeElapsed] = useState(() => {
    return Number(localStorage.getItem("stopwatch-time")) || 0;
  });

  const [isActive, setIsActive] = useState(() => {
    return localStorage.getItem("stopwatch-active") === "true";
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const toggleStopwatch = () => {
    setIsActive((prev) => !prev);
  };

  const resetStopwatch = () => {
    setIsActive(false);
    setTimeElapsed(0);
    if (timerRef.current) clearInterval(timerRef.current);
    localStorage.setItem("stopwatch-time", "0");
    localStorage.setItem("stopwatch-active", "false");
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1000);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  useEffect(() => {
    localStorage.setItem("stopwatch-time", timeElapsed.toString());
  }, [timeElapsed]);

  useEffect(() => {
    localStorage.setItem("stopwatch-active", isActive.toString());
  }, [isActive]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6 m-4">
      {/* Simple Clock Display */}
      <div className="w-40 h-40 flex items-center justify-center border-4 border-gray-200 rounded-full">
        <span className="text-4xl font-bold text-gray-800">
          {formatTime(timeElapsed)}
        </span>
      </div>

      {/* Controls */}
      <div className="flex !space-x-4 !mt-2">
        <button
          onClick={toggleStopwatch}
          className={`!px-3   rounded-sm shadow-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isActive
              ? "bg-red-500 hover:bg-red-500 text-white focus:ring-red-500"
              : "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500"
          }`}
        >
          {isActive ? "Stop" : "Start"}
        </button>

        <button
          onClick={resetStopwatch}
          className="!px-3  bg-gray-200 text-gray-700 font-medium rounded-sm shadow-sm hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
