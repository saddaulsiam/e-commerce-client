import PrivateRoute from "@/components/mainComponents/Auth/private/PrivateRoute";
import { OrderProductCart } from "@/components/mainComponents/OrderProduct";
import { BottomBar, Footer, Navbar } from "@/components/sharedComponents";

const Cart = () => {
  return (
    <PrivateRoute>
      <Navbar />
      <OrderProductCart />
      <BottomBar />
      <Footer />
    </PrivateRoute>
  );
};

export default Cart;
