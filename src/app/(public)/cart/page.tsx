import PrivateRoute from "@/components/mainComponents/Auth/private/PrivateRoute";
import { OrderProductCart } from "@/components/mainComponents/OrderProduct";

const Cart = () => {
  return (
    <PrivateRoute>
      <OrderProductCart />
    </PrivateRoute>
  );
};

export default Cart;
