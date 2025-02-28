import PrivateRoute from "@/components/mainComponents/Auth/private/PrivateRoute";
import { OrderProductDetails } from "@/components/mainComponents/OrderProduct";

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
