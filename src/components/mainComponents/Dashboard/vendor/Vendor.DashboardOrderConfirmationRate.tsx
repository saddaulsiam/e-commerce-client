"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideCheckCircle } from "lucide-react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type TProps = {
  overview: {
    cancelledOrders: number;
    completedOrders: number;
    lowStockProducts: number;
    monthlyEarnings: number;
    pendingOrders: number;
    totalSales: number;
  };
};

const VendorDashboardOrderConfirmationRate = ({ overview }: TProps) => {
  // Prepare data for the pie chart
  const data = [
    { name: "Completed Orders", value: overview?.completedOrders },
    { name: "Pending Orders", value: overview?.pendingOrders },
    { name: "Cancelled Orders", value: overview?.cancelledOrders },
  ];

  // Define colors for the pie segments
  const COLORS = ["#4F46E5", "#FFA500", "#FF6347"];

  return (
    <Card>
      <CardHeader className="mx-8 my-2">
        <CardTitle className="flex text-xl md:text-2xl">
          <LucideCheckCircle className="mr-2 h-6 w-6 text-primary" />
          Order Confirmation Rate
        </CardTitle>
        <CardDescription>Performance based on order statuses</CardDescription>
      </CardHeader>

      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="85%"
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default VendorDashboardOrderConfirmationRate;
