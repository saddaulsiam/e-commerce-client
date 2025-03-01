import React from "react";
import {
  VendorDashboardLayout,
  VendorAllOrders,
} from "../../../components/mainComponents/Dashboard/vendor";

const AllOrders = () => {
  return (
    <div>
      <VendorDashboardLayout>
        <VendorAllOrders />
      </VendorDashboardLayout>
    </div>
  );
};

export default AllOrders;
