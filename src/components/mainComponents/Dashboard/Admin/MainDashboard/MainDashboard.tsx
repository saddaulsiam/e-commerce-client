"use client";

import { useGetAdminDashboardMetaQuery } from "@/redux/features/admin/adminApi";
import { BsEye, BsFillCreditCardFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import RecentUsers from "./RecentUsers";
import RevenueChart from "./RevenueChart";
import SalesDistribution from "./SalesDistribution";
import StatCard from "./StatCard";
import VendorPerformance from "./VendorPerformance";

const AdminMainDashboard = () => {
  const { data: dashboardMeta } = useGetAdminDashboardMetaQuery(undefined);
  const meta = dashboardMeta?.data?.meta;

  const formatValue = (value?: number) => {
    if (value == null) return "$0";
    return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : `${value}`;
  };

  const dashboardStats = [
    {
      title: "Visitors",
      value: formatValue(meta?.overview?.totalVisitors),
      change: `12.5%`,
      icon: BsEye,
      color: "#6366f1",
    },
    {
      title: "Pending Orders",
      value: formatValue(meta?.overview?.pendingOrders),
      change: `8.2%`,
      icon: FiShoppingCart,
      color: "#10b981",
    },
    {
      title: "Revenue",
      value: `$${formatValue(meta?.overview?.yearlyRevenue)}`,
      change: `18.4%`,
      icon: BsFillCreditCardFill,
      color: "#3b82f6",
    },
    {
      title: "Customers",
      value: formatValue(meta?.overview?.totalCustomers),
      change: `5.1%`,
      icon: FaUsers,
      color: "#f59e0b",
    },
  ];

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
        <RevenueChart revenueData={meta?.revenueData} />

        {/* Sales Distribution Pie Chart */}
        <SalesDistribution />
      </div>

      {/* Recent Users Table */}
      <RecentUsers recentCustomers={meta?.recentCustomers} />

      {/* Vendor Performance Section */}
      <VendorPerformance topVendors={meta?.topVendors} />
    </div>
  );
};

export default AdminMainDashboard;
