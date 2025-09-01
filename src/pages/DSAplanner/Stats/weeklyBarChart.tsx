// components/charts/WeeklyBarChart.tsx

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyBarChart: React.FC<{
  expectedTime: number[];
  timeTaken: number[];
  startDate : Date
}> = ({ expectedTime, timeTaken,startDate }) => {

  const labels = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    return date.toLocaleDateString('en-US', options); // e.g., "Jun 1"
  });



  const data = {
    labels: labels,
    datasets: [
      {
        label: "Expected Time",
        data: expectedTime,
        backgroundColor: "rgba(59, 130, 246, 0.6)", // Tailwind blue-500
        borderRadius: {
          topLeft: 6,
          topRight: 6,
        },
        barThickness: 13,
        stack: "sideBySide1",
      },
      {
        label: "Extra Time",
        data: timeTaken,
        backgroundColor: "rgba(239, 68, 68, 0.6)", // Tailwind red-500
        borderRadius: {
          topLeft: 6,
          topRight: 6,
        },
        barThickness: 13,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        stacked: true,
        ticks: {
          color: "#62748e",
          stepSize: 5,
        },
        grid: {
          color: "#e5e7eb",
        },
      },
      x: {
        stacked: true,
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
        position: "top" as const,
        labels: {
          color: "#374151",
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 12,
          boxHeight: 12,
          padding: 20,
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
    },
  };

  return (
    <div className="w-[95%] h-[16rem]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default WeeklyBarChart;
