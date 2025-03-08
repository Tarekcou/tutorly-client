import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const userData = [
  { month: "Jan", users: 200 },
  { month: "Feb", users: 300 },
  { month: "Mar", users: 450 },
  { month: "Apr", users: 600 },
  { month: "May", users: 750 },
  { month: "Jun", users: 900 },
];

const tutorialData = [
  { category: "Math", count: 50 },
  { category: "Science", count: 80 },
  { category: "English", count: 40 },
  { category: "Programming", count: 120 },
];

const tutorStats = [
  { name: "Active Tutors", value: 120 },
  { name: "Inactive Tutors", value: 30 },
];

const COLORS = ["#0088FE", "#FF8042"];

const DashboardChart = () => {
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 p-6">
      {/* Total Users Over Time */}
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <h2 className="mb-4 font-bold text-xl">Total Users Over Time</h2>
        <LineChart width={400} height={250} data={userData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#82ca9d" />
        </LineChart>
      </div>

      {/* Total Tutorials Per Category */}
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <h2 className="mb-4 font-bold text-xl">Total Tutorials Per Category</h2>
        <BarChart width={400} height={250} data={tutorialData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Tutor List Breakdown */}
      <div className="flex justify-center col-span-1 md:col-span-2 bg-white shadow-lg p-4 rounded-lg">
        <h2 className="mb-4 font-bold text-xl text-center">
          Tutor List Breakdown
        </h2>
        <PieChart width={300} height={300}>
          <Pie
            data={tutorStats}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {tutorStats.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default DashboardChart;
