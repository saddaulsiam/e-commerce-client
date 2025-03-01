"use client";

import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLocationPin } from "react-icons/md";
import AddressForm from "../../../sharedComponents/forms/AddressForm";
import DashboardCustomerSideBarNavigation from "./Dashboard.Customer.SideBar.Navigation";

const DashboardCustomersAddressNew = () => {
  const [showSideNavigation, setShowSideNavigation] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-2 gap-y-5">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-primary">
            <MdLocationPin className="mr-3 inline text-3xl text-primary" />
            <span>New Address</span>
          </h2>
        </div>
        <div className="flex justify-end lg:hidden">
          <button
            className="text-2xl font-thin"
            onClick={() => setShowSideNavigation(true)}
          >
            <GiHamburgerMenu />
          </button>
        </div>
        <div className="flex lg:justify-end">
          <Link href="/customer/addresses">
            <button className="button">Back To Addresses</button>
          </Link>
        </div>
      </div>
      <div className="mt-5">
        <AddressForm />
      </div>
      {showSideNavigation && (
        <DashboardCustomerSideBarNavigation
          setShowSideNavigation={setShowSideNavigation}
        />
      )}
    </div>
  );
};

export default DashboardCustomersAddressNew;
