import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the data type
interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: ChartData[];
}

// DonutChart Component
const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  // Prepare chart.js data
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: data.map((d) => d.color),
        hoverOffset: 4,
      },
    ],
  };

  // Chart options
  const options: ChartOptions<'doughnut'> = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '50%', // For donut shape
    animation: {
      animateRotate: false,
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-64 h-64 mx-auto">
      <Doughnut data={chartData} options={options} />
      <ul className="mt-4 space-y-2">
        {data.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center px-2 py-1 border-l-4"
            style={{ borderColor: item.color }}
          >
            <span>{item.label}</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Wrapper Component for demo
const DonutChartWrapper: React.FC = () => {
  const chartDataAI: ChartData[] = [
    { label: "Books", value: 55521, color: "#EF4444" },
    { label: "Collected content", value: 54521, color: "#3B82F6" },
    { label: "Evals", value: 5421, color: "#FBBF24" },
    { label: "Exams", value: 5487, color: "#10B981" },
    { label: "Reasoning", value: 21445, color: "#A78BFA" },
    { label: "Generated Content", value: 8759, color: "#F59E0B" },
  ];
  const chartDataJSONL: ChartData[] = [
    { label: "Reasoning jsonl", value: 319, color: "#EF4444" },
    
  ];
  const chartDataConsulting: ChartData[] = [
    { label: "Aviation", value: 10225, color: "#3B82F6" },
    { label: "Strategy", value: 0, color: "#EF4444" },
    
  ];
  const chartDataMedia: ChartData[] = [
    { label: "Analytical Reps", value: 0, color: "#EF4444" },
    { label: "Categorized Clips", value: 0, color: "#3B82F6" },
    { label: "News Clips", value: 0, color: "#FBBF24" },
    { label: "Readings", value: 0, color: "#10B981" },
    { label: "Research Reps & Vids", value:0, color: "#A78BFA" },
    { label: "Statistics", value: 1, color: "#F59E0B" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mt-10">
    <div className="wrapper text-center">
      <h1 className="text-2xl font-bold mb-4">JSONL</h1>
      <DonutChart data={chartDataJSONL} />
    </div>
    <div className="wrapper text-center">
      <h1 className="text-2xl font-bold mb-4">AI</h1>
      <DonutChart data={chartDataAI} />
    </div>
    <div className="wrapper text-center">
      <h1 className="text-2xl font-bold mb-4">Consulting</h1>
      <DonutChart data={chartDataConsulting} />
    </div>
    <div className="wrapper text-center">
      <h1 className="text-2xl font-bold mb-4">Media</h1>
      <DonutChart data={chartDataMedia} />
    </div>

    </div>
  );
};

export default DonutChartWrapper;
