import { ProductCheckout } from "@/components/mainComponents/Order";
import PrivateRoute from "@/providers/PrivateRoute";

const Checkout = () => {
  return (
    <PrivateRoute>
      <ProductCheckout />
    </PrivateRoute>
  );
};

export default Checkout;
