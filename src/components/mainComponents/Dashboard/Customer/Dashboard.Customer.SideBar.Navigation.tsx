import React from "react";
import {
  userAccounts,
  userDashboard,
} from "../../../../data/dashboard.navigation";
import DashboardCustomerNavigation from "./Dashboard.Customer.Navigation";

const DashboardCustomerSideBarNavigation = ({ setShowSideNavigation }) => {
  return (
    <section className="fixed inset-0 z-10 flex h-screen w-screen justify-between">
      <div className="h-screen w-3/5 bg-white sm:w-1/3">
        <div className="my-1 mt-32 rounded-md bg-white p-2">
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

      <div
        className="w-3/5 bg-gray-900/60 sm:w-2/3"
        onClick={() => setShowSideNavigation(false)}
      />
    </section>
  );
};

export default DashboardCustomerSideBarNavigation;
