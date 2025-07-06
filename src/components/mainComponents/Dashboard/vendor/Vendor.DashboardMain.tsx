"use client";

import { useGetVendorDashboardMetaQuery } from "@/redux/features/vendor/vendorApi";
import { FiAlertCircle, FiPackage, FiTrendingUp } from "react-icons/fi";
import { formatValue } from "../Admin/MainDashboard/MainDashboard";
import DashboardMainStatsCard from "../Common/DashboardMainStatsCard";
import VendorDashboardMainResentOrders from "./Vendor.MainResentOrders";
import VendorDashboardMainReviewsCard from "./Vendor.MainReviewsCard";
import VendorSalesChart from "./Vendor.MainSalesChart";

const VendorDashboardMain = () => {
  const { data: dashboardMeta } = useGetVendorDashboardMetaQuery(undefined);
  const meta = dashboardMeta?.data?.meta;

  const dashboardStats = [
    {
      title: "Total Revenue",
      value: `৳ ${formatValue(meta?.overview?.totalRevenue)}`,
      trend: "12.5%",
      positive: true,
      icon: <FiTrendingUp className="h-6 w-6 text-white" />,
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "Pending Orders",
      value: formatValue(meta?.overview?.pendingOrders),
      trend: "5.2%",
      positive: false,
      icon: <FiAlertCircle className="h-6 w-6 text-white" />,
      color: "from-primary to-orange-500",
    },
    {
      title: "Low Stock",
      value: formatValue(meta?.overview?.lowStock),
      trend: "Attention",
      positive: false,
      icon: <FiPackage className="h-6 w-6 text-white" />,
      color: "from-red-500 to-pink-500",
    },
    {
      title: "Earnings",
      value: `৳ ${formatValue(meta?.overview?.earnings)}`,
      trend: "8%",
      positive: true,
      icon: <FiTrendingUp className="h-6 w-6 text-white" />,
      color: "from-green-500 to-teal-500",
    },
  ];
  return (
    <div className="flex min-h-screen w-full flex-col md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Vendor Name</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((card, i) => (
          <DashboardMainStatsCard key={i} {...card} />
        ))}
      </div>

      {/* Sales Chart */}
      <VendorSalesChart salesData={meta?.salesData} />

      {/* Resent Orders & Reviews Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Resent Orders */}
        <VendorDashboardMainResentOrders recentOrders={meta?.recentOrders} />

        {/* Reviews Card */}
        <VendorDashboardMainReviewsCard reviews={meta?.reviews} />
      </div>
    </div>
  );
};

export default VendorDashboardMain;
