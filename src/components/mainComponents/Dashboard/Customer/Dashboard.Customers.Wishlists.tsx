"use client";

import Head from "next/head";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import DashboardCustomerSideBarNavigation from "./Dashboard.Customer.SideBar.Navigation";
import { Button } from "@/components/ui/button";

const DashboardCustomersWishlists = () => {
  return (
    <>
      <Head>
        <title>My Wish List</title>
      </Head>
      <div className="mb-10">
        <div className="grid grid-cols-2 gap-y-5">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold text-primary">
              <BsFillSuitHeartFill className="mr-3 inline text-primary" />
              <span> My Wish List</span>
            </h2>
          </div>
          <div className="flex justify-end lg:hidden">
            <Button className="text-2xl font-thin">
              <GiHamburgerMenu />
            </Button>
          </div>
          <div className="flex lg:justify-end">
            <Button className="button">Add All To Cart</Button>
          </div>
        </div>
        <div className="pt-5">
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 rounded-md bg-white sm:grid-cols-3 lg:grid-cols-4">
            {/* Product cards will be inserted here */}
          </div>
          <div className="mt-10 text-center">
            {/* Pagination will be inserted here */}
          </div>
        </div>
        {/* Side Navigation */}
        <DashboardCustomerSideBarNavigation />
      </div>
    </>
  );
};

export default DashboardCustomersWishlists;
