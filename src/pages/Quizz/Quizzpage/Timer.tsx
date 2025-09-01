import { useEffect, useState } from "react";

interface TimerProps {
  max: number; // in minutes
}

export default function Timer({ max }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(max * 60); // in seconds

  useEffect(() => {
    if (timeLeft === 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="  rounded-md  flex  !p-3  justify-center items-center  ">
      <div className="font-semibold text-neutral-600 text-2xl">
        {formatTime(timeLeft)}
      </div>
    </div>
  );
}
