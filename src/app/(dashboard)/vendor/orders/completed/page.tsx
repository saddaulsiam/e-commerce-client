import { VendorCompletedOrders } from "@/components/mainComponents/Dashboard/vendor";
import PrivateRoute from "@/providers/PrivateRoute";

const SingleOrderDetails = () => {
  return (
    <PrivateRoute>
      <VendorCompletedOrders />
    </PrivateRoute>
  );
};

export default SingleOrderDetails;
