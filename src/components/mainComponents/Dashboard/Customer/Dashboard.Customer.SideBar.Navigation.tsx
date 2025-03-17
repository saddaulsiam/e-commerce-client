import React from "react";
import DashboardCustomerNavigation from "./Dashboard.Customer.Navigation";

const DashboardCustomerSideBarNavigation = () => {
  return (
    <section className="fixed inset-0 z-10 flex h-screen w-screen justify-between">
      <div className="h-screen w-3/5 bg-white sm:w-1/3">
        <div className="my-1 mt-32 rounded-md bg-white p-2">
          <h2 className="ml-3 pb-5 text-base font-medium text-my-gray-200">
            DASHBOARD
          </h2>
          <DashboardCustomerNavigation />
          <h2 className="ml-3 py-5 text-base font-medium text-my-gray-200">
            ACCOUNT SETTINGS
          </h2>
          <DashboardCustomerNavigation />
        </div>
      </div>
      <div className="w-3/5 bg-gray-900/60 sm:w-2/3" />
    </section>
  );
};

export default DashboardCustomerSideBarNavigation;
