import VendorReportsMain from "@/components/mainComponents/Dashboard/vendor/Vendor.ReportsMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Reports",
};

const Reports = () => {
  return <VendorReportsMain />;
};

export default Reports;
