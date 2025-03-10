import { FiAlertCircle, FiPackage, FiTrendingUp } from "react-icons/fi";
import DashboardMainStatsCard from "./Vendor.DashboardMainStatsCard";
import VendorDashboardMainSalesChart from "./Vendor.DashboardMainSalesChart";
import VendorDashboardMainResentOrders from "./Vendor.DashboardMainResentOrders";
import VendorDashboardMainReviewsCard from "./Vendor.DashboardMainReviewsCard";

const VendorDashboardMain = () => {
  // Sample fake data for demonstration
  const overview = {
    totalSales: 32000,
    pendingOrders: 45,
    lowStockProducts: 12,
    monthlyEarnings: 8500,
  };
  return (
    <div className="flex min-h-screen w-full flex-col p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Vendor Name</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardMainStatsCard
          title="Total Revenue"
          value={`$${overview.totalSales.toLocaleString()}`}
          trend="12.5%"
          positive={true}
          icon={<FiTrendingUp className="h-6 w-6 text-white" />}
          color="bg-gradient-to-br from-indigo-500 to-purple-500 "
        />
        <DashboardMainStatsCard
          title="Pending Orders"
          value={overview.pendingOrders}
          trend="5.2%"
          positive={false}
          icon={<FiAlertCircle className="h-6 w-6 text-white" />}
          color="bg-gradient-to-br from-primary to-orange-500"
        />
        <DashboardMainStatsCard
          title="Low Stock"
          value={overview.lowStockProducts}
          trend="Attention"
          positive={false}
          icon={<FiPackage className="h-6 w-6 text-white" />}
          color="bg-gradient-to-br from-red-500 to-pink-500"
        />
        <DashboardMainStatsCard
          title="Earnings"
          value={`$${overview.monthlyEarnings.toLocaleString()}`}
          trend="8%"
          positive={true}
          icon={<FiTrendingUp className="h-6 w-6 text-white" />}
          color="bg-gradient-to-br from-green-500 to-teal-500"
        />
      </div>

      {/* Sales Chart */}
      <VendorDashboardMainSalesChart />

      {/* Resent Orders & Reviews Section */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Resent Orders */}
        <VendorDashboardMainResentOrders />

        {/* Reviews Card */}
        <VendorDashboardMainReviewsCard />
      </div>
    </div>
  );
};

export default VendorDashboardMain;
