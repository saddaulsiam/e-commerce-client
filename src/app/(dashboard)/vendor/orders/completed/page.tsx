import { VendorCompletedOrders } from "@/components/mainComponents/Dashboard/vendor";
import PrivateRoute from "@/providers/PrivateRoute";

const SingleOrderDetails = () => {
  return (
    <PrivateRoute role="vendor">
      <VendorCompletedOrders />
    </PrivateRoute>
  );
};

export default SingleOrderDetails;
