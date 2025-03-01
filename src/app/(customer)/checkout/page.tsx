import PrivateRoute from "@/providers/PrivateRoute";
import { OrderProductDetails } from "@/components/mainComponents/Order";

const Checkout = () => {
  return (
    <div>
      <PrivateRoute>
        <OrderProductDetails />
      </PrivateRoute>
    </div>
  );
};

export default Checkout;
