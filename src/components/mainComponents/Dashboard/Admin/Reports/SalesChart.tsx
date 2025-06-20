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
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AdminSalesChart = ({ salesData }: any) => {
  const [timeRange, setTimeRange] = useState<
    "hourly" | "daily" | "weekly" | "monthly"
  >("weekly");

  let currentData = [];

  switch (timeRange) {
    case "hourly":
      currentData = salesData?.hourly || [];
      break;
    case "daily":
      currentData = salesData?.daily || [];
      break;
    case "weekly":
      currentData = salesData?.weekly || [];
      break;
    case "monthly":
      currentData = salesData?.monthly || [];
      break;
  }

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="mx-8 my-2">
          <CardTitle className="flex pb-1 text-xl md:text-2xl">
            <LucideBarChart className="mr-2 text-primary" /> Sales Overview
          </CardTitle>
          <CardDescription>Performance for the selected period</CardDescription>
        </div>

        <div className="flex gap-2">
          {["hourly", "daily", "weekly", "monthly"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              onClick={() => setTimeRange(range as any)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis
              dataKey={
                timeRange === "monthly"
                  ? "month"
                  : timeRange === "weekly"
                    ? "day"
                    : timeRange === "daily"
                      ? "day"
                      : "hour"
              }
              tick={{ fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            {/* <YAxis
              tick={{ fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
            /> */}
            <Tooltip
              labelFormatter={(label) => {
                if (timeRange === "monthly") return `Month: ${label}`;
                if (timeRange === "weekly") return `Day: ${label}`;
                if (timeRange === "daily") return `Date: ${label}`;
                return `Hour: ${label}`;
              }}
              contentStyle={{
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#3b82f8"
              fill="#3b82f8"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#60a5fa"
              fill="#60a5fa"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AdminSalesChart;
