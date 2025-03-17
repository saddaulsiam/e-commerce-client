import PaymentSuccess from "@/components/mainComponents/Payment/PaymentSuccess";
import PrivateRoute from "@/providers/PrivateRoute";

const Success = () => {
  return (
    <PrivateRoute>
      <PaymentSuccess />
    </PrivateRoute>
  );
};

export default Success;
