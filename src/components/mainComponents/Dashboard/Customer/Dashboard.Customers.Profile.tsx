"use client";

import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import DashboardCustomerSideBarNavigation from "./Dashboard.Customer.SideBar.Navigation";
import DashboardCustomersOrders from "./Dashboard.Customers.Orders";

const DashboardCustomersProfile = () => {
  const [showSideNavigation, setShowSideNavigation] = useState(null);
  const { user } = useAppSelector(({ state }) => state.auth);

  return (
    <div className="mb-10">
      <div className="grid grid-cols-2 gap-y-5">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-primary">
            <MdAccountCircle className="mr-3 inline text-primary" />
            <span> My Profile</span>
          </h2>
        </div>
        <div className="flex justify-end lg:hidden">
          <button className="text-2xl font-thin " onClick={() => setShowSideNavigation(true)}>
            <GiHamburgerMenu />
          </button>
        </div>
        <div className="flex lg:justify-end">
          <Link href="/customer/profile/edit">
            <button className="button">Edit Profile</button>
          </Link>
        </div>
      </div>

      <div className="my-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <div className="flex items-center justify-between rounded-md bg-white px-10 py-5">
            <div className="flex items-center space-x-3">
              <Image
                className="rounded-full"
                height="50"
                width="50"
                src={user?.photoURL || "https://bonik-react.vercel.app/assets/images/faces/ralph.png"}
                alt=""
                priority
              />
              <h2 className="text-base font-semibold text-my-gray-200">{user.displayName}</h2>
            </div>
            <div className="">
              <h3 className="text-sm text-my-gray-200">{user.role}</h3>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-4 gap-3 ">
            <div className="flex flex-col items-center justify-center rounded-md bg-white py-2.5">
              <h2 className="text-lg font-semibold text-primary">{user?.myOrders?.length}</h2>
              <p className="text-sm text-my-gray-100">All Orders</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-white py-2.5">
              <h2 className="text-lg font-semibold text-primary">10</h2>
              <p className="text-sm text-my-gray-100">
                Awaiting <br /> Payments
              </p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-white py-2.5">
              <h2 className="text-lg font-semibold text-primary">10</h2>
              <p className="text-sm text-my-gray-100">
                Awaiting <br /> Shipment
              </p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-white py-2.5">
              <h2 className="text-lg font-semibold text-primary">10</h2>
              <p className="text-sm text-my-gray-100">
                Awaiting <br />
                Delivery
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-3 rounded-md bg-white px-3 py-5 sm:grid-cols-4 sm:gap-x-24 xl:gap-x-3 ">
        <div>
          <p className="text-xs text-my-gray-100">Full Name</p>
          <p className="text-base leading-10 text-my-gray-200">{user.displayName}</p>
        </div>
        <div>
          <p className="text-xs text-my-gray-100">Email</p>
          <p className="text-base leading-10 text-my-gray-200">{user.email}</p>
        </div>
        <div>
          <p className="text-xs text-my-gray-100">Phone</p>
          <p className="text-base leading-10 text-my-gray-200">{user.phoneNumber || "Add your phone number"}</p>
        </div>
        <div>
          <p className="text-xs text-my-gray-100">Birth date</p>
          <p className="text-base leading-10 text-my-gray-200">{user.birthDate || "Add your birth date"}</p>
        </div>
      </div>
      <div className="mt-10">
        <DashboardCustomersOrders />
      </div>
      {showSideNavigation && <DashboardCustomerSideBarNavigation setShowSideNavigation={setShowSideNavigation} />}
    </div>
  );
};

export default DashboardCustomersProfile;
