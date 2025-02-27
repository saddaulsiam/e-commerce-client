import PrivateRoute from "@/components/mainComponents/Auth/private/PrivateRoute";
import { OrderProductPayment } from "@/components/mainComponents/OrderProduct";

const payment = () => {
  return (
    <PrivateRoute>
      <OrderProductPayment />
    </PrivateRoute>
  );
};

export default payment;
