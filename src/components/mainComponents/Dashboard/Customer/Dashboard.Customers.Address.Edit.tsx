"use client";

import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLocationPin } from "react-icons/md";
import AddressForm from "../../../sharedComponents/forms/AddressForm";
import DashboardCustomerSideBarNavigation from "./Dashboard.Customer.SideBar.Navigation";
import { Button } from "@/components/ui/button";

const DashboardCustomersAddressEdit = () => {
  const [showSideNavigation, setShowSideNavigation] = useState(null);
  return (
    <div>
      <div className="mb-5 grid grid-cols-2 gap-y-5">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-primary">
            <MdLocationPin className="mr-3 inline text-3xl text-primary" />
            <span>Edit Address</span>
          </h2>
        </div>
        <div className="flex justify-end lg:hidden">
          <Button
            className="text-2xl font-thin"
            onClick={() => setShowSideNavigation(true)}
          >
            <GiHamburgerMenu />
          </Button>
        </div>
        <div className="flex lg:justify-end">
          <Link href="/customer/addresses">
            <Button>Back To Addresses</Button>
          </Link>
        </div>
      </div>
      <AddressForm />
      {showSideNavigation && (
        <DashboardCustomerSideBarNavigation
          setShowSideNavigation={setShowSideNavigation}
        />
      )}
    </div>
  );
};

export default DashboardCustomersAddressEdit;
