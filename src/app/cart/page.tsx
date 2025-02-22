import PrivateRoute from "@/components/mainComponents/Auth/private/PrivateRoute";
import { OrderProductCart } from "@/components/mainComponents/OrderProduct";
import { BottomBar, Footer, Navbar } from "@/components/sharedComponents";
import Head from "next/head";

const Cart = () => {
  return (
    <>
      <Head>
        <title>My Cart</title>
      </Head>
      <PrivateRoute>
        <Navbar />
        <OrderProductCart />
        <BottomBar />
        <Footer />
      </PrivateRoute>
    </>
  );
};

export default Cart;
