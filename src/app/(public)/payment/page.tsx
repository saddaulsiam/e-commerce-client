import { ProductPayment } from "@/components/mainComponents/Order";
import PrivateRoute from "@/providers/PrivateRoute";

const payment = () => {
  return (
    <PrivateRoute role="customer">
      <ProductPayment />
    </PrivateRoute>
  );
};

export default payment;
