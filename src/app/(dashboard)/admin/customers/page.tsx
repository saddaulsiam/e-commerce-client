import { AdminAllCustomers } from "@/components/mainComponents/Dashboard/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Customers",
};
const Customers = () => {
  return <AdminAllCustomers />;
};

export default Customers;
