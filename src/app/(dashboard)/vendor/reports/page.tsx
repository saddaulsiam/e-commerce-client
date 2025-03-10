"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart as LucideBarChart,
  LineChart as LucideLineChart,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const analyticsData = {
  monthlySales: [
    { month: "Jan", sales: 3000, orders: 45 },
    { month: "Feb", sales: 4000, orders: 62 },
    { month: "Mar", sales: 3500, orders: 78 },
    { month: "Apr", sales: 5500, orders: 65 },
    { month: "May", sales: 6800, orders: 89 },
    { month: "Jun", sales: 4800, orders: 102 },
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
      <h2 className="pb-6 text-3xl font-semibold text-slate-800">Analytics</h2>

      {/* Monthly Sales Report */}
      <Card className="mb-8">
        <CardHeader className="mx-8 my-2">
          <CardTitle className="flex">
            <LucideBarChart className="mr-2 h-6 w-6 text-primary" />
            Monthly Sales Overview
          </CardTitle>
          <CardDescription>Performance for the selected period</CardDescription>
        </CardHeader>

        <CardContent className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={analyticsData.monthlySales}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#6366f1" name="Sales ($)" />
              <Bar dataKey="orders" fill="hsl(var(--primary))" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Customer Growth Report */}
      <Card className="rounded-lg bg-white p-6 shadow">
        <CardHeader className="mx-8 my-2">
          <CardTitle className="flex">
            <LucideLineChart className="mr-2 h-6 w-6 text-primary" />
            Customer Growth
          </CardTitle>
          <CardDescription>Performance for the selected period</CardDescription>
        </CardHeader>

        <CardContent className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={analyticsData.customerGrowth}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="customers"
                stroke="#6366f1"
                strokeWidth={2}
                name="Customers"
                dot={{ r: 4, stroke: "#4F46E5", strokeWidth: 2.5 }}
                activeDot={{ r: 4, stroke: "#4F46E5", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
