import { VendorCompletedOrders } from "@/components/mainComponents/Dashboard/vendor";
import PrivateRoute from "@/providers/PrivateRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Complete Orders",
};

const CompleteOrders = () => {
  return (
    <PrivateRoute role="vendor">
      <VendorCompletedOrders />
    </PrivateRoute>
  );
};

export default CompleteOrders;
