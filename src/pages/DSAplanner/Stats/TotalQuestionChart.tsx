// components/DonutChart.tsx
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { FC } from "react";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  easy: number;
  medium: number;
  hard: number;
};

const TotalQuestionChart: FC<Props> = ({ easy, medium, hard }) => {
  const chartData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "Questions Plan",
        data: [easy, medium, hard],
        backgroundColor: [
          "#fee685",
          "oklch(0.828 0.189 84.429)",
          "oklch(0.555 0.163 48.998)",
        ], // green, amber, red
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#45556c',
          font: {
            size: 12,
            weight: 500,
          },
            padding: 20,
          usePointStyle: true, // 👈 changes square to point style
          pointStyle: 'circle', // 👈 options: 'circle', 'rect', 'triangle', etc.
        },
      },
    },
  };
  
  

  return (
    <div className="w-[15rem]  h-[15rem]">
      <Pie data={chartData}  options={options} />
    </div>
  );
};

export default TotalQuestionChart;
