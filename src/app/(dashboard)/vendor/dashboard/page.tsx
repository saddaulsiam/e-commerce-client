import { VendorDashboardMain } from "@/components/mainComponents/Dashboard/vendor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Dashboard",
};

const VendorDashboard = () => {
  return <VendorDashboardMain />;
};

export default VendorDashboard;
