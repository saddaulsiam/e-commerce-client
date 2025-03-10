"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideBarChart } from "lucide-react";
import { useState } from "react";
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

const VendorDashboardMainSalesChart = () => {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">(
    "weekly",
  );

  // Sample fake data for demonstration
  const salesData = {
    monthly: [
      { week: "Week 1", sales: 4000, orders: 120 },
      { week: "Week 2", sales: 6500, orders: 210 },
      { week: "Week 3", sales: 7200, orders: 180 },
      { week: "Week 4", sales: 4800, orders: 150 },
    ],
    weekly: [
      { day: "Mon", sales: 1200, orders: 45 },
      { day: "Tue", sales: 1800, orders: 62 },
      { day: "Wed", sales: 2100, orders: 78 },
      { day: "Thu", sales: 1750, orders: 65 },
      { day: "Fri", sales: 2400, orders: 89 },
      { day: "Sat", sales: 3000, orders: 102 },
      { day: "Sun", sales: 2750, orders: 95 },
    ],
    daily: [
      { hour: "12 AM", sales: 200, orders: 8 },
      { hour: "4 AM", sales: 450, orders: 15 },
      { hour: "8 AM", sales: 1200, orders: 42 },
      { hour: "12 PM", sales: 2400, orders: 85 },
      { hour: "4 PM", sales: 1800, orders: 68 },
      { hour: "8 PM", sales: 900, orders: 35 },
    ],
  };
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="mx-8 my-2">
          <CardTitle className="flex pb-1">
            <LucideBarChart className="mr-2 h-6 w-6 text-primary" /> Sales
            Overview
          </CardTitle>
          <CardDescription>Performance for the selected period</CardDescription>
        </div>

        <div className="flex gap-2">
          <Button
            variant={timeRange === "daily" ? "default" : "outline"}
            onClick={() => setTimeRange("daily")}
          >
            Daily
          </Button>
          <Button
            variant={timeRange === "weekly" ? "default" : "outline"}
            onClick={() => setTimeRange("weekly")}
          >
            Weekly
          </Button>
          <Button
            variant={timeRange === "monthly" ? "default" : "outline"}
            onClick={() => setTimeRange("monthly")}
          >
            Monthly
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData[timeRange]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={
                timeRange === "monthly"
                  ? "week"
                  : timeRange === "weekly"
                    ? "day"
                    : "hour"
              }
            />
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

export default VendorDashboardMainSalesChart;
