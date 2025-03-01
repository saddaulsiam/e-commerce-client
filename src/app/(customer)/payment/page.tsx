import PrivateRoute from "@/providers/PrivateRoute";
import { OrderProductPayment } from "@/components/mainComponents/Order";

const payment = () => {
  return (
    <PrivateRoute>
      <OrderProductPayment />
    </PrivateRoute>
  );
};

export default payment;
