import { DashboardCustomersOrders } from "../../../components/mainComponents/Dashboard/Customer";
import DashboardCustomerLayout from "../../../components/mainComponents/Dashboard/Customer/Dashboard.Customer.Layout";

const Index = () => {
  return (
    <DashboardCustomerLayout>
      <DashboardCustomersOrders />
    </DashboardCustomerLayout>
  );
};

export default Index;
