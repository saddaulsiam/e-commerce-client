"use client";

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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { LucideWallet } from "lucide-react";

const RevenueChart = ({ revenueData }: any) => {
  const [timeRange, setTimeRange] = useState<"monthly" | "yearly">("monthly");

  const currentData = revenueData?.[timeRange] || [];

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="mx-8 my-2">
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
            <LucideWallet className="text-primary" />
            Revenue Overview
          </CardTitle>
          <CardDescription>Total revenue over time</CardDescription>
        </div>
        <div className="flex gap-2">
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
      </CardHeader>

      <CardContent className="h-80">
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
              labelFormatter={(label) =>
                timeRange === "yearly" ? `Year: ${label}` : `Month: ${label}`
              }
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
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
