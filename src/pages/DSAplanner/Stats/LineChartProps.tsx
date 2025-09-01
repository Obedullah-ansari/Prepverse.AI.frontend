import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

type LineChartProps = {
  labels: string[];
  idealData: number[];
  actualData: number[];
};

const LineChart: React.FC<LineChartProps> = ({
  labels,
  idealData,
  actualData,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Current Pace",
        data: actualData,
        borderColor: "rgb(138, 197, 252)", 
        backgroundColor: "rgba(138, 197, 252, 0.635",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Ideal Pace",
        data: idealData,
        borderColor: "#10b981", 
        backgroundColor: "rgba(142, 232, 216, 0.83)",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#111827",
          usePointStyle: true,
          pointStyle: "circle", // change to "rect" for square
          boxWidth: 12,
          boxHeight: 12,
          padding: 20,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#4B5563" },
        grid: { color: "#E5E7EB" },
      },
      y: {
        ticks: { color: "#4B5563" },
        grid: { color: "#E5E7EB" },
      },
    },
  };

  return (
    <>
      <div className="w-[95%]  h-full !p-3 ">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default LineChart;
