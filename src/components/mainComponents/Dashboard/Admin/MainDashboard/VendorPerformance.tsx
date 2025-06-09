import { Button } from "@/components/ui/button";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const VendorPerformance = ({ topVendors }: any) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-6 flex justify-between">
        <h2 className="text-xl font-bold text-gray-800">Top Vendors</h2>
        <Button variant="link">View All</Button>
      </div>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={
              [
                { name: "Tech Haven", sales: 43200, products: 24 },
                { name: "Fashion Forward", sales: 38700, products: 18 },
                { name: "Home Essentials", sales: 29500, products: 32 },
                { name: "Beauty Spot", sales: 24500, products: 15 },
                { name: "Gadget Zone", sales: 19800, products: 22 },
              ]
              //topVendors || []
            }
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
            <Tooltip formatter={(name, value) => [name, value]} />
            <Bar dataKey="sales" fill="#8884d8" name="Total Sales" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VendorPerformance;
