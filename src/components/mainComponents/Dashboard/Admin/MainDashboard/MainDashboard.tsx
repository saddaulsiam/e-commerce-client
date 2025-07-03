"use client";

import { useGetAdminDashboardMetaQuery } from "@/redux/features/admin/adminApi";
import { BsEye } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FiShoppingCart, FiTrendingUp } from "react-icons/fi";
import DashboardMainStatsCard from "../../Common/DashboardMainStatsCard";
import RecentUsers from "./RecentUsers";
import RecentVendor from "./RecentVendor";
import RevenueChart from "./RevenueChart";
import SalesDistribution from "./SalesDistribution";
import VendorPerformance from "./VendorPerformance";

export const formatValue = (value?: number) => {
  if (value == null) return "$0";
  return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : `${value}`;
};

const AdminMainDashboard = () => {
  const { data: dashboardMeta } = useGetAdminDashboardMetaQuery(undefined);
  const meta = dashboardMeta?.data?.meta;

  const dashboardStats = [
    {
      title: "Visitors",
      value: formatValue(meta?.overview?.totalVisitors),
      trend: `12.5%`,
      icon: <BsEye className="h-6 w-6 text-white" />,
      color: "from-blue-500 to-indigo-500",
      positive: true,
    },
    {
      title: "Pending Orders",
      value: formatValue(meta?.overview?.pendingOrders),
      trend: `8.2%`,
      icon: <FiShoppingCart className="h-6 w-6 text-white" />,
      color: "from-yellow-500 to-orange-500",
      positive: true,
    },
    {
      title: "Revenue",
      value: `$${formatValue(meta?.overview?.yearlyRevenue)}`,
      trend: `18.4%`,
      icon: <FiTrendingUp className="h-6 w-6 text-white" />,
      color: "from-green-500 to-emerald-500",
      positive: true,
    },
    {
      title: "Customers",
      value: formatValue(meta?.overview?.totalCustomers),
      trend: `5.1%`,
      positive: false,
      icon: <FaUsers className="h-6 w-6 text-white" />,
      color: "from-purple-500 to-pink-500",
    },
  ];
  return (
    <div className="mx-4 my-5 space-y-8 md:mx-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((card, index) => (
          <DashboardMainStatsCard key={index} {...card} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Revenue Chart */}
        <RevenueChart revenueData={meta?.revenueData} />

        {/* Sales Distribution Pie Chart */}
        <SalesDistribution />
      </div>

      {/* Vendor Performance Section */}
      <VendorPerformance topVendors={meta?.topVendors} />

      {/* Recent Vendor */}
      <RecentVendor recentVendors={meta?.recentVendors} />

      {/* Recent Users Table */}
      <RecentUsers recentCustomers={meta?.recentCustomers} />
    </div>
  );
};

export default AdminMainDashboard;
