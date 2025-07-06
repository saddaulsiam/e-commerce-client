import { AdminDashboardAllOrdersDetails } from "@/components/mainComponents/Dashboard/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details",
};
const OrderDetails = () => {
  return <AdminDashboardAllOrdersDetails />;
};

export default OrderDetails;
