"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLocationPin } from "react-icons/md";
import DashboardCustomerSideBarNavigation from "./Dashboard.Customer.SideBar.Navigation";

const DashboardCustomersAddresses = () => {
  const [showSideNavigation, setShowSideNavigation] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-2 gap-y-5">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-primary">
            <MdLocationPin className="mr-3 inline text-3xl text-primary" />
            <span> My Profile</span>
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
          <Link href="/customer/addresses/new">
            <Button>Add New Addresses</Button>
          </Link>
        </div>
      </div>
      <div className="mt-5 bg-white p-5">
        <div className="grid grid-cols-12 gap-5 rounded-md bg-slate-300/80 p-3 text-sm text-my-gray-200 sm:text-base">
          <p className="col-span-4 lg:col-span-2">Full Name</p>
          <p className="col-span-4 lg:col-span-2">Address</p>
          <p className="col-span-4 lg:col-span-3">Region</p>
          <p className="col-span-4 lg:col-span-2">Phone</p>
          <p className="col-span-4 lg:col-span-2">Email</p>
          <p className="col-span-4 lg:col-span-1">Action</p>
        </div>
      </div>
      {showSideNavigation && (
        <DashboardCustomerSideBarNavigation
          setShowSideNavigation={setShowSideNavigation}
        />
      )}
    </div>
  );
};

export default DashboardCustomersAddresses;
