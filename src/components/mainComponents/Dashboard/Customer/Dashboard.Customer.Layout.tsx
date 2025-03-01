import {
  userAccounts,
  userDashboard,
} from "../../../../data/dashboard.navigation";
import PrivateRoute from "../../../../providers/PrivateRoute";
import DashboardCustomerNavigation from "./Dashboard.Customer.Navigation";

const DashboardCustomerLayout = ({ children }) => {
  return (
    <PrivateRoute>
      <div className="container mt-32 px-3 pb-5 lg:mt-48 xl:px-0">
        <div className="grid grid-cols-4 gap-5 pt-5">
          <div className="hidden lg:col-span-1 lg:block">
            <div className="my-1 rounded-md bg-white p-2">
              <h2 className="ml-3 pb-5 text-base font-medium text-my-gray-200">
                DASHBOARD
              </h2>
              <DashboardCustomerNavigation navData={userDashboard} />
              <h2 className="ml-3 py-5 text-base font-medium text-my-gray-200">
                ACCOUNT SETTINGS
              </h2>
              <DashboardCustomerNavigation navData={userAccounts} />
            </div>
          </div>
          <div className="col-span-4 lg:col-span-3">{children}</div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default DashboardCustomerLayout;
