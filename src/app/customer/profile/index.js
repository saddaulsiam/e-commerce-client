import { DashboardCustomersProfile } from "../../../components/mainComponents/Dashboard/Customer";
import DashboardCustomerLayout from "../../../components/mainComponents/Dashboard/Customer/Dashboard.Customer.Layout";

const Index = () => {
  return (
    <DashboardCustomerLayout>
      <DashboardCustomersProfile />
    </DashboardCustomerLayout>
  );
};

export default Index;
