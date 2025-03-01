import PrivateRoute from "@/providers/PrivateRoute";
import Cancel from "@/components/mainComponents/Payment/";

const payment = () => {
  return (
    <PrivateRoute>
      <Cancel />
    </PrivateRoute>
  );
};

export default payment;
