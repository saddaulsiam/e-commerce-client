import { ProductCheckout } from "@/components/mainComponents/Order";
import PrivateRoute from "@/providers/PrivateRoute";

const Checkout = () => {
  return (
    <PrivateRoute role="customer">
      <ProductCheckout />
    </PrivateRoute>
  );
};

export default Checkout;
