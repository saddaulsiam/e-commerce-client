"use client";

import { useGetVendorDashboardMetaQuery } from "@/redux/features/vendor/vendorApi";
import { FiAlertCircle, FiPackage, FiTrendingUp } from "react-icons/fi";
import VendorDashboardMainResentOrders from "./Vendor.MainResentOrders";
import VendorDashboardMainReviewsCard from "./Vendor.MainReviewsCard";
import VendorDashboardMainSalesChart from "./Vendor.MainSalesChart";
import DashboardMainStatsCard from "./Vendor.MainStatsCard";

const VendorDashboardMain = () => {
  const { data: dashboardMeta } = useGetVendorDashboardMetaQuery(undefined);
  const meta = dashboardMeta?.data?.meta;
  return (
    <div className="flex min-h-screen w-full flex-col md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Vendor Name</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardMainStatsCard
          title="Total Revenue"
          value={`$${meta?.overview?.totalSales}`}
          trend="12.5%"
          positive={true}
          icon={<FiTrendingUp className="h-6 w-6 text-white" />}
          color="bg-gradient-to-br from-indigo-500 to-purple-500 "
        />
        <DashboardMainStatsCard
          title="Pending Orders"
          value={meta?.overview?.pendingOrders}
          trend="5.2%"
          positive={false}
          icon={<FiAlertCircle className="h-6 w-6 text-white" />}
          color="bg-gradient-to-br from-primary to-orange-500"
        />
        <DashboardMainStatsCard
          title="Low Stock"
          value={meta?.overview?.lowStockProducts}
          trend="Attention"
          positive={false}
          icon={<FiPackage className="h-6 w-6 text-white" />}
          color="bg-gradient-to-br from-red-500 to-pink-500"
        />
        <DashboardMainStatsCard
          title="Earnings"
          value={`$${meta?.overview?.monthlyEarnings.toLocaleString()}`}
          trend="8%"
          positive={true}
          icon={<FiTrendingUp className="h-6 w-6 text-white" />}
          color="bg-gradient-to-br from-green-500 to-teal-500"
        />
      </div>

      {/* Sales Chart */}
      <VendorDashboardMainSalesChart salesData={meta?.salesData} />

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
