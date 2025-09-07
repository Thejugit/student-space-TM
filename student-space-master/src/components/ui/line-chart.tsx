// src/components/ui/line-chart.tsx
"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart() {
  const data = {
    labels: ["Test 1", "Test 2", "Test 3", "Test 4", "Test 5", "Test 6"],
    datasets: [
      {
        label: "Marks",
        data: [25, 28, 24, 30, 28, 32],
        borderColor: "#1E3A8A",
        backgroundColor: "rgba(30, 58, 138, 0.1)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 35,
      },
    },
  };

  return <Line data={data} options={options} />;
}
