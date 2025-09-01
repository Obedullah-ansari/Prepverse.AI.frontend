// components/charts/SimpleBarChart.tsx

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface SimpleBarChartProps {
  expectedTime: number;
  timeTaken: number;
}

const BarChart: React.FC<SimpleBarChartProps> = ({
  expectedTime,
  timeTaken,
}) => {
  const data = {
    labels: ["Time Allotted", "Time Taken"],
    datasets: [
      {
        label: "Minutes",
        data: [expectedTime, timeTaken],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)", // blue for allotted
          "rgba(234, 179, 8, 0.7)",  // amber for taken
        ],
        barThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          color: "#4b5563",
        },
        grid: {
          color: "#e5e7eb",
        },
      },
      x: {
        ticks: {
          color: "#4b5563",
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Optional: hide legend since it's obvious
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
