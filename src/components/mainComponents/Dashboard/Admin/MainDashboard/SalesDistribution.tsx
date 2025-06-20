"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { LucidePieChart } from "lucide-react";

const salesDistribution = [
  { name: "Electronics", value: 23450 },
  { name: "Apparel", value: 18400 },
  { name: "Home Goods", value: 15600 },
  { name: "Beauty", value: 12600 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const SalesDistribution = () => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="mx-8 my-2">
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
            <LucidePieChart className="text-primary" />
            Sales Distribution
          </CardTitle>
          <CardDescription>By product category</CardDescription>
        </div>
        <Button variant="link">View Details</Button>
      </CardHeader>

      <CardContent>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={salesDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {salesDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`$${value}`, `${name}`]}
                contentStyle={{
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {salesDistribution.map((category, index) => (
            <div key={category.name} className="flex items-center">
              <span
                className="mr-2 h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-sm font-medium">{category.name}</span>
              <span className="ml-auto text-sm text-gray-600">
                ${category.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesDistribution;
