"use client";
import { Button } from "@/components/ui/button";
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

const RevenueChart = ({ revenueData }: any) => {
  const [timeRange, setTimeRange] = useState<"monthly" | "yearly">("monthly");

  let currentData = revenueData?.[timeRange] || [];

  if (timeRange === "yearly") {
    currentData = revenueData?.yearly || [];
  }
  return (
    <div className="rounded-lg bg-white p-6 shadow lg:col-span-2">
      <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
        <h2 className="text-xl font-bold text-gray-800">Revenue Overview</h2>
        <div className="mt-4 flex gap-2 md:mt-0">
          <Button
            variant={timeRange === "monthly" ? "default" : "outline"}
            onClick={() => setTimeRange("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant={timeRange === "yearly" ? "default" : "outline"}
            onClick={() => setTimeRange("yearly")}
          >
            Yearly
          </Button>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis
              dataKey={timeRange === "monthly" ? "month" : "year"}
              tick={{ fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tick={{ fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              formatter={(value) => [`$${value}`, "Revenue"]}
              labelFormatter={(label) => `Month: ${label}`}
              contentStyle={{
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
