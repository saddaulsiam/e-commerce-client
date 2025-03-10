import {
  VendorDashboardCustomerGrowthReports,
  VendorDashboardMonthlySalesReports,
} from "@/components/mainComponents/Dashboard/vendor";
import { ChartArea } from "lucide-react";

const Reports = () => {
  return (
    <div className="p-6">
      <h2 className="flex items-center pb-6 text-2xl font-bold text-slate-700">
        <ChartArea className="mr-2 text-primary" /> Analytics
      </h2>
      {/* Monthly Sales Report */}
      <VendorDashboardMonthlySalesReports />

      {/* Customer Growth Report */}
      <VendorDashboardCustomerGrowthReports />
    </div>
  );
};

export default Reports;
