import { VendorPendingOrders } from "@/components/mainComponents/Dashboard/vendor";
import PrivateRoute from "@/providers/PrivateRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Pending Orders",
};

const PendingOrders = () => {
  return (
    <PrivateRoute role="vendor">
      <VendorPendingOrders />;
    </PrivateRoute>
  );
};

export default PendingOrders;
