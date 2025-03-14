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

const VendorDashboardMainSalesChart = ({ salesData }: any) => {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">(
    "weekly",
  );

  // Ensure salesData is defined and has the expected structure
  let currentData = salesData?.[timeRange] || [];

  // Use `monthlyDaysSales` instead of aggregated `monthly` data
  if (timeRange === "monthly") {
    currentData = salesData?.monthlyDaysSales || [];
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
          <BarChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={
                timeRange === "monthly"
                  ? "day"
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
