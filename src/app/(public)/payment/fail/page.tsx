import { PaymentFail } from "@/components/mainComponents/Payment";
import PrivateRoute from "@/providers/PrivateRoute";

const Cancel = () => {
  return (
    <PrivateRoute role="customer">
      <PaymentFail />
    </PrivateRoute>
  );
};

export default Cancel;
