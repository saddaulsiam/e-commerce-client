import React from "react";
import {
  VendorDashboardLayout,
  VendorAddProduct,
} from "../../../components/mainComponents/Dashboard/vendor";

const addProduct = () => {
  return (
    <div>
      <VendorDashboardLayout>
        <VendorAddProduct />
      </VendorDashboardLayout>
    </div>
  );
};

export default addProduct;
