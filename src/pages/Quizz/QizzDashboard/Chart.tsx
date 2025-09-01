// components/DonutChart.tsx
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { FC } from "react";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  correct: number;
  wrong: number;
  skipped: number;
};

const UserDoneQuestions: FC<Props> = ({ correct, wrong, skipped }) => {
  const chartData = {
    labels: ["Correct", "Wrong", "Skipped"],
    datasets: [
      {
        label: "Nuber of Questions",
        data: [correct, wrong, skipped],
        backgroundColor: [
          "#abebc6",
          "#cd6155",
          "#f4d03f",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#45556c",
          font: {
            size: 12,
            weight: 550,
          },
          padding: 20,
          usePointStyle: true, // 👈 changes square to point style
          pointStyle: "circle", // 👈 options: 'circle', 'rect', 'triangle', etc.
        },
      },
    },
  };

  return (

      <Pie data={chartData} options={options} />

  );
};

export default UserDoneQuestions;
