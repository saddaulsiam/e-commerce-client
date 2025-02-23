import React from "react";
import {
  VendorDashboardLayout,
  VendorAllProducts,
} from "../../../components/mainComponents/Dashboard/vendor";

const index = () => {
  return (
    <div>
      <VendorDashboardLayout>
        <VendorAllProducts />
      </VendorDashboardLayout>
    </div>
  );
};

export default index;
