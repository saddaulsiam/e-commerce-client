import { VendorPendingOrders } from "@/components/mainComponents/Dashboard/vendor";
import PrivateRoute from "@/providers/PrivateRoute";

const PendingOrders = () => {
  return (
    <PrivateRoute role="vendor">
      <VendorPendingOrders />;
    </PrivateRoute>
  );
};

export default PendingOrders;
