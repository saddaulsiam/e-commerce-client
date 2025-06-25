"use client";

import { useGetAdminDashboardMetaQuery } from "@/redux/features/admin/adminApi";
import RevenueChart from "../MainDashboard/RevenueChart";
import CustomerGrowthChart from "../../Common/CustomerGrowthChart";
import AdminSalesChart from "./SalesChart";

const AdminMainReports = () => {
  const { data: dashboardMeta } = useGetAdminDashboardMetaQuery(undefined);
  const meta = dashboardMeta?.data?.meta;

  return (
    <div className="space-y-5">
      <RevenueChart revenueData={meta?.revenueData} />
      <CustomerGrowthChart customerGrowthData={meta?.customerGrowthData} />
      <AdminSalesChart salesData={meta?.salesData} />
    </div>
  );
};

export default AdminMainReports;
