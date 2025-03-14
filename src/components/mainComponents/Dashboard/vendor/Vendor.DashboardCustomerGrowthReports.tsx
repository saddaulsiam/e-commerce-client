"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LineChart as LucideLineChart } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TProps = {
  customerGrowth: [{ month: string; customers: number }];
};

const VendorDashboardCustomerGrowthReports = ({ customerGrowth }: TProps) => {
  return (
    <Card>
      <CardHeader className="mx-8 my-2">
        <CardTitle className="flex text-xl md:text-2xl">
          <LucideLineChart className="mr-2 h-6 w-6 text-primary" />
          Customer Growth
        </CardTitle>
        <CardDescription>Performance for the selected period</CardDescription>
      </CardHeader>

      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={customerGrowth}
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
  );
};

export default VendorDashboardCustomerGrowthReports;
