"use client";
import {
  BarChart as LucideBarChart,
  LineChart as LucideLineChart,
} from "lucide-react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const analyticsData = {
  monthlySales: [
    { month: "Jan", sales: 3000 },
    { month: "Feb", sales: 4000 },
    { month: "Mar", sales: 3500 },
    { month: "Apr", sales: 4500 },
    { month: "May", sales: 5000 },
    { month: "Jun", sales: 4800 },
  ],
  customerGrowth: [
    { month: "Jan", customers: 50 },
    { month: "Feb", customers: 70 },
    { month: "Mar", customers: 65 },
    { month: "Apr", customers: 80 },
    { month: "May", customers: 90 },
    { month: "Jun", customers: 85 },
  ],
};

const Reports = () => {
  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Analytics</h2>

      {/* Monthly Sales Report */}
      <div className="mb-10 rounded-lg bg-white p-6 shadow">
        <div className="mb-4 flex items-center">
          <LucideBarChart className="mr-2 h-6 w-6 text-gray-600" />
          <h3 className="text-xl font-semibold">Monthly Sales</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={analyticsData.monthlySales}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Growth Report */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-4 flex items-center">
          <LucideLineChart className="mr-2 h-6 w-6 text-gray-600" />
          <h3 className="text-xl font-semibold">Customer Growth</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={analyticsData.customerGrowth}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="customers" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
