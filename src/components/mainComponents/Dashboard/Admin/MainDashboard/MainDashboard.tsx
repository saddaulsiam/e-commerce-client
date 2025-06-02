"use client";

import { Button } from "@/components/ui/button";
import {
  useGetAdminDashboardMetaQuery,
  useGetAllCustomersQuery,
} from "@/redux/features/admin/adminApi";
import { TUser } from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import { BsEye, BsFillCreditCardFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import StatCard from "./StatCard";
import RevenueChart from "./RevenueChart";

// Demo data
const demoStats = {
  visitors: 13456,
  visitorChange: 12.5,
  orders: 234,
  orderChange: 8.2,
  revenue: 456230,
  revenueChange: 18.4,
  users: 589,
  userChange: 5.1,
  revenueData: [
    { month: "Jan", revenue: 35000 },
    { month: "Feb", revenue: 42000 },
    { month: "Mar", revenue: 31000 },
    { month: "Apr", revenue: 58000 },
    { month: "May", revenue: 49000 },
    { month: "Jun", revenue: 67000 },
    { month: "Jul", revenue: 73000 },
    { month: "Aug", revenue: 82000 },
    { month: "Sep", revenue: 78000 },
    { month: "Oct", revenue: 91000 },
    { month: "Nov", revenue: 105000 },
    { month: "Dec", revenue: 124000 },
  ],
  salesDistribution: [
    { name: "Electronics", value: 23450 },
    { name: "Apparel", value: 18400 },
    { name: "Home Goods", value: 15600 },
    { name: "Beauty", value: 12600 },
  ],
  totalSales: 70050,
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminMainDashboard = () => {
  const { data: customers } = useGetAllCustomersQuery({
    page: 1,
    limit: 20,
  });

  const { data: dashboardMeta } = useGetAdminDashboardMetaQuery(undefined);
  const meta = dashboardMeta?.data?.meta;

  // For demo purposes:
  const stats = demoStats;

  const dashboardStats = [
    {
      title: "Visitors",
      value: `${(stats.visitors / 1000).toFixed(1)}K`,
      change: `${stats.visitorChange}%`,
      icon: BsEye,
      color: "#6366f1",
    },
    {
      title: "Total Orders",
      value: `${stats.orders}`,
      change: `${stats.orderChange}%`,
      icon: FiShoppingCart,
      color: "#10b981",
    },
    {
      title: "Revenue",
      value: `$${(stats.revenue / 1000).toFixed(1)}K`,
      change: `${stats.revenueChange}%`,
      icon: BsFillCreditCardFill,
      color: "#3b82f6",
    },
    {
      title: "Users",
      value: `${stats.users}`,
      change: `${stats.userChange}%`,
      icon: FaUsers,
      color: "#f59e0b",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "block":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "vendor":
        return "bg-blue-100 text-blue-800";
      case "customer":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="mx-4 my-5 space-y-8 md:mx-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Revenue Chart */}
        <RevenueChart meta={meta} />

        {/* Sales Distribution Pie Chart */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-6 flex justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              Sales Distribution
            </h2>
            <Button variant="outline">Details</Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.salesDistribution}
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
                  {stats.salesDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    `$${value}`,
                    `${name} (${(props.payload.percent * 100).toFixed(1)}%)`,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {stats.salesDistribution.map((category, index) => (
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
      </div>

      {/* Recent Users Table */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-6 flex justify-between">
          <h2 className="text-xl font-bold text-gray-800">Recent Users</h2>
          <Link href="/admin/customers">
            <Button variant="link">View All</Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b-2">
              <tr>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers?.data?.data?.map((user: TUser) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="relative h-16 w-16">
                      <Image
                        layout="fill"
                        className="rounded-full"
                        src={user?.profile?.photo || "/user-avatar.jpg"}
                        alt="User Image"
                        priority
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${getRoleBadge(user.role)}`}
                    >
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-sm capitalize ${getStatusBadge(user.status)}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:bg-blue-50"
                      onClick={() => {
                        navigator.clipboard.writeText(user._id);
                        toast.success("User ID copied to clipboard");
                      }}
                    >
                      Copy ID
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vendor Performance Section */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-6 flex justify-between">
          <h2 className="text-xl font-bold text-gray-800">Top Vendors</h2>
          <Button variant="outline">View All</Button>
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { name: "Tech Haven", sales: 43200, products: 24 },
                { name: "Fashion Forward", sales: 38700, products: 18 },
                { name: "Home Essentials", sales: 29500, products: 32 },
                { name: "Beauty Spot", sales: 24500, products: 15 },
                { name: "Gadget Zone", sales: 19800, products: 22 },
              ]}
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
                formatter={(value, name) => [
                  name === "sales" ? `$${value}` : value,
                  name === "sales" ? "Total Sales" : "Products Listed",
                ]}
              />
              <Bar dataKey="sales" fill="#8884d8" name="Total Sales" />
              <Bar dataKey="products" fill="#82ca9d" name="Products Listed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminMainDashboard;
