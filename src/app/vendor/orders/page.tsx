import React from "react";
import {
  VendorDashboardLayout,
  VendorAllOrders,
} from "../../../components/mainComponents/Dashboard/vendor";

const index = () => {
  return (
    <div>
      <VendorDashboardLayout>
        <VendorAllOrders />
      </VendorDashboardLayout>
    </div>
  );
};

export default index;
