"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart as LucideBarChart } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const VendorDashboardMonthlySalesReports = () => {
  const monthlySales = [
    { month: "Jan", sales: 3000, orders: 45 },
    { month: "Feb", sales: 4000, orders: 62 },
    { month: "Mar", sales: 3500, orders: 78 },
    { month: "Apr", sales: 5500, orders: 65 },
    { month: "May", sales: 6800, orders: 89 },
    { month: "Jun", sales: 4800, orders: 102 },
  ];

  return (
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
            data={monthlySales}
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
  );
};

export default VendorDashboardMonthlySalesReports;
