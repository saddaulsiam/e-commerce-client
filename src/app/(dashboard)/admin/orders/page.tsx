import { AdminDashboardAllOrders } from "@/components/mainComponents/Dashboard/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Orders",
};
const AdminAllOrders = () => {
  return <AdminDashboardAllOrders />;
};

export default AdminAllOrders;
