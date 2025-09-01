// components/DonutChart.tsx
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { FC } from "react";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  easy: number;
  medium: number;
  hard: number;
  totalquestiondone: number;
  totalQuestionsCoutPerWeek: number;
};

const UserDoneQuestions: FC<Props> = ({
  easy,
  medium,
  hard,
  totalquestiondone,
  totalQuestionsCoutPerWeek,
}) => {
  const chartData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "Questions Solved",
        data: [easy, medium, hard],
        backgroundColor: [
          "#fee685",
          "oklch(0.828 0.189 84.429)",
          "oklch(0.555 0.163 48.998)",
        ], // green, amber, red
        borderWidth: 0,
        barThinkness: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#45556c",
          font: {
            size: 12,
            weight: 500,
          },
          padding: 20,
          usePointStyle: true, // 👈 changes square to point style
          pointStyle: "circle", // 👈 options: 'circle', 'rect', 'triangle', etc.
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center relative w-[18rem] h-[18rem]">
      <Doughnut data={chartData} options={options} />
      <div className="w-full rounded-full h-full  flex flex-col   justify-start !pt-[30%] pointer-events-none items-center absolute top-0 left-0">
        <span className=" text-2xl font-semibold text-slate-600 ">
          {totalquestiondone}/{totalQuestionsCoutPerWeek}
        </span>
        <span className="font-medium text-slate-600 ">Questions Done</span>
        <p>{(totalquestiondone / totalQuestionsCoutPerWeek) * 100}%</p>
      </div>
    </div>
  );
};

export default UserDoneQuestions;
