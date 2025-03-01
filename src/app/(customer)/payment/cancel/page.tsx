import { PaymentCancel } from "@/components/mainComponents/Payment";
import PrivateRoute from "@/providers/PrivateRoute";

const Cancel = () => {
  return (
    <PrivateRoute>
      <PaymentCancel />
    </PrivateRoute>
  );
};

export default Cancel;
