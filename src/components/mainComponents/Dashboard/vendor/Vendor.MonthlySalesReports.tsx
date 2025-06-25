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

type TProps = {
  salesData: {
    month: string;
    orders: number;
    sales: number;
  }[];
};

const VendorMonthlySalesReports = ({ salesData }: TProps) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="mx-8 my-2">
        <CardTitle className="flex text-xl md:text-2xl">
          <LucideBarChart className="mr-2 h-6 w-6 text-primary" />
          Monthly Sales Overview
        </CardTitle>
        <CardDescription>Performance for the selected period</CardDescription>
      </CardHeader>

      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={salesData}
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

export default VendorMonthlySalesReports;
