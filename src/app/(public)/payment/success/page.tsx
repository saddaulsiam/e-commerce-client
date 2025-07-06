import PaymentSuccess from "@/components/mainComponents/Payment/PaymentSuccess";
import PrivateRoute from "@/providers/PrivateRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Success",
};
const Success = () => {
  return (
    <PrivateRoute role="customer">
      <PaymentSuccess />
    </PrivateRoute>
  );
};

export default Success;
