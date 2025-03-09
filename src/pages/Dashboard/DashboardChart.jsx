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
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 p-4 md:p-6">
      {/* Total Users Over Time */}
      <div className="shadow-lg p-4 rounded-lg">
        <h2 className="mb-4 font-bold text-xl text-center">
          Total Users Over Time
        </h2>
        <div className="flex justify-center w-full overflow-x-auto">
          <LineChart
            width={window.innerWidth < 768 ? 300 : 400}
            height={250}
            data={userData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>

      {/* Total Tutorials Per Category */}
      <div className="shadow-lg p-4 rounded-lg">
        <h2 className="mb-4 font-bold text-xl text-center">
          Total Tutorials Per Category
        </h2>
        <div className="flex justify-center w-full overflow-x-auto">
          <BarChart
            width={window.innerWidth < 768 ? 300 : 400}
            height={250}
            data={tutorialData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
      </div>

      {/* Tutor List Breakdown */}
      <div className="flex flex-col items-center col-span-1 md:col-span-2 shadow-lg p-4 rounded-lg">
        <h2 className="mb-4 font-bold text-xl text-center">
          Tutor List Breakdown
        </h2>
        <div className="flex justify-center w-full">
          <PieChart width={window.innerWidth < 768 ? 250 : 300} height={300}>
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
    </div>
  );
};

export default DashboardChart;
