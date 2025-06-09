import { Button } from "@/components/ui/button";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const salesDistribution = [
  { name: "Electronics", value: 23450 },
  { name: "Apparel", value: 18400 },
  { name: "Home Goods", value: 15600 },
  { name: "Beauty", value: 12600 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const SalesDistribution = () => {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-6 flex justify-between">
        <h2 className="text-xl font-bold text-gray-800">Sales Distribution</h2>
        <Button variant="link">View Details</Button>
      </div>
      <div className="h-64">
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
            <Tooltip formatter={(value, name) => [`$${value}`, `${name}`]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
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
    </div>
  );
};

export default SalesDistribution;
