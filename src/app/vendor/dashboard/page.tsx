import { VendorDashboardLayout, VendorMainDashboard } from "@/components/mainComponents/Dashboard/vendor";
import React from "react";

const dashboard = () => {
  return (
    <div>
      <VendorDashboardLayout>
        <VendorMainDashboard />
      </VendorDashboardLayout>
    </div>
  );
};

export default dashboard;
