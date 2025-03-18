import { Button } from "@/components/ui/button";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const PieChartComponent = () => {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div className="col-span-3 h-96 bg-white p-4 lg:col-span-1">
      <div className="flex items-center justify-between pb-6">
        <div className="flex gap-10">
          <p className="text-xl font-bold text-primary">Visitors Analytics</p>
        </div>
        <div className="btn-group">
          <Button>Monthly</Button>
          <Button>Yearly</Button>
        </div>
      </div>
      <ResponsiveContainer height="60%" width="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="pt-4">
        <ul className="gap-y- grid grid-cols-2 gap-x-10 text-sm text-my-gray-100">
          <li className="flex justify-between">
            <span>Desktop</span>
            <span className="text-[#0088FE]">65%</span>
          </li>
          <li className="flex justify-between">
            <span>Tablet </span>
            <span className="text-[#00C49F]">34%</span>
          </li>
          <li className="flex justify-between">
            <span>Mobile</span>
            <span className="text-[#FFBB28]">45%</span>
          </li>
          <li className="flex justify-between">
            <span>Unknown</span>
            <span className="text-[#FF8042]">12%</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PieChartComponent;
