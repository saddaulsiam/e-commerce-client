"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LucideStore } from "lucide-react";

const sampleData = [
  { name: "Tech Haven", sales: 43200, products: 24 },
  { name: "Fashion Forward", sales: 38700, products: 18 },
  { name: "Home Essentials", sales: 29500, products: 32 },
  { name: "Beauty Spot", sales: 24500, products: 15 },
  { name: "Gadget Zone", sales: 19800, products: 22 },
];

const VendorPerformance = ({ topVendors }: any) => {
  const data = sampleData || topVendors;

  return (
    <Card>
      <CardHeader className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="mx-8 my-2">
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
            <LucideStore className="text-primary" />
            Top Vendors
          </CardTitle>
          <CardDescription>Vendors ranked by total sales</CardDescription>
        </div>
        <Button variant="link">View All</Button>
      </CardHeader>

      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fill: "#6b7280" }}
            />
            <YAxis
              tick={{ fill: "#6b7280" }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              formatter={(value: number) => [`$${value}`, "Total Sales"]}
              contentStyle={{
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar dataKey="sales" fill="#6366f1" name="Total Sales" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default VendorPerformance;
