import { DashboardCustomersOrderDetails } from "@/components/mainComponents/Dashboard/Customer";
import DashboardCustomerLayout from "@/components/mainComponents/Dashboard/Customer/Dashboard.Customer.Layout";

const OrderById = () => {
  return (
    <DashboardCustomerLayout>
      <DashboardCustomersOrderDetails />
    </DashboardCustomerLayout>
  );
};

export default OrderById;
