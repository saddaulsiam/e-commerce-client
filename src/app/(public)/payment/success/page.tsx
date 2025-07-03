import PaymentSuccess from "@/components/mainComponents/Payment/PaymentSuccess";
import PrivateRoute from "@/providers/PrivateRoute";

const Success = () => {
  return (
    <PrivateRoute role="customer">
      <PaymentSuccess />
    </PrivateRoute>
  );
};

export default Success;
