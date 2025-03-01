import {
  VendorDashboardLayout,
  VendorEditProductDetails,
} from "@/components/mainComponents/Dashboard/vendor";
import React from "react";

const SingleProductDetails = () => {
  return (
    <div>
      <VendorDashboardLayout>
        <VendorEditProductDetails />
      </VendorDashboardLayout>
    </div>
  );
};

export default SingleProductDetails;
