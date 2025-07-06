import { ProductCheckout } from "@/components/mainComponents/Order";
import PrivateRoute from "@/providers/PrivateRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};
const Checkout = () => {
  return (
    <PrivateRoute role="customer">
      <ProductCheckout />
    </PrivateRoute>
  );
};

export default Checkout;
