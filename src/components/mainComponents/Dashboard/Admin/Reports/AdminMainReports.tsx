"use client";

import { useGetAdminDashboardMetaQuery } from "@/redux/features/admin/adminApi";
import RevenueChart from "../MainDashboard/RevenueChart";
import CustomerGrowthChart from "./CustomerGrowthChart";

const AdminMainReports = () => {
  const { data: dashboardMeta } = useGetAdminDashboardMetaQuery(undefined);
  const meta = dashboardMeta?.data?.meta;

  console.log(meta);
  return (
    <div className="space-y-5">
      <RevenueChart revenueData={meta?.revenueData} />
      <CustomerGrowthChart customerGrowthData={meta?.customerGrowthData} />
    </div>
  );
};

export default AdminMainReports;
