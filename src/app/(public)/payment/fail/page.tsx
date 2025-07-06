import { PaymentFail } from "@/components/mainComponents/Payment";
import PrivateRoute from "@/providers/PrivateRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Fail",
};
const Cancel = () => {
  return (
    <PrivateRoute role="customer">
      <PaymentFail />
    </PrivateRoute>
  );
};

export default Cancel;
