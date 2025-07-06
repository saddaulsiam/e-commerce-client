import { ProductPayment } from "@/components/mainComponents/Order";
import PrivateRoute from "@/providers/PrivateRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment",
};
const payment = () => {
  return (
    <PrivateRoute role="customer">
      <ProductPayment />
    </PrivateRoute>
  );
};

export default payment;
