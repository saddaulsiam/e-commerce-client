"use client";

import {
  VendorDashboardCustomerGrowthReports,
  VendorDashboardMonthlySalesReports,
  VendorDashboardOrderConfirmationRate,
} from "@/components/mainComponents/Dashboard/vendor";
import { useGetVendorDashboardMetaQuery } from "@/redux/features/vendor/vendorApi";
import { ChartArea } from "lucide-react";

const Reports = () => {
  const { data: dashboardMeta } = useGetVendorDashboardMetaQuery("");
  const meta = dashboardMeta?.data?.meta;
  return (
    <div className="md:p-6">
      <h2 className="flex items-center pb-6 text-2xl font-bold text-slate-700">
        <ChartArea className="mr-2 text-primary" /> Analytics
      </h2>

      <div className="mb-10 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Monthly Sales Report */}
        <VendorDashboardMonthlySalesReports
          salesData={meta?.salesData?.monthly}
        />
        {/* Order Confirmation Rate */}
        <VendorDashboardOrderConfirmationRate overview={meta?.overview} />
      </div>

      {/* Customer Growth Report */}
      <VendorDashboardCustomerGrowthReports
        customerGrowth={meta?.customerGrowth}
      />
    </div>
  );
};

export default Reports;
