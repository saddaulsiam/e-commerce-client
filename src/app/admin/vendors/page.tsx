import React from "react";
import {
  AdminAllVendors,
  AdminDashboardLayout,
} from "../../../components/mainComponents/Dashboard/Admin";

const vendors = () => {
  return (
    <AdminDashboardLayout>
      <AdminAllVendors />
    </AdminDashboardLayout>
  );
};

export default vendors;
