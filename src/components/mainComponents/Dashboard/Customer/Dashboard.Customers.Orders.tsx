"use client";

import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useGetMyOrdersQuery } from "../../../../redux/features/orders/orders/ordersApi";
import { Loading } from "../../../sharedComponents";
import DashboardCustomerOrdersCart from "./Dashboard.Customer.Orders.Cart";
import DashboardCustomerSideBarNavigation from "./Dashboard.Customer.SideBar.Navigation";

const DashboardCustomersOrders = () => {
  const [showSideNavigation, setShowSideNavigation] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const { data: myOrders, isLoading } = useGetMyOrdersQuery(user?.email);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center text-2xl font-semibold text-primary">
              <FaShoppingBag className="mr-3 inline text-2xl text-primary" />
              My Orders
            </h2>
            <button className="text-2xl font-thin lg:hidden" onClick={() => setShowSideNavigation(true)}>
              <GiHamburgerMenu />
            </button>
          </div>
          <div>
            <div>
              <ul className="mt-8 grid grid-cols-5 px-5 text-sm font-semibold text-my-gray-100 sm:text-base">
                <li>Order #</li>
                <li>Status</li>
                <li>Date Purchased</li>
                <li>Pay</li>
                <li>Total</li>
              </ul>
            </div>
            <div>
              <DashboardCustomerOrdersCart orders={myOrders?.data} />
            </div>
          </div>
        </div>
      )}
      {showSideNavigation && <DashboardCustomerSideBarNavigation setShowSideNavigation={setShowSideNavigation} />}
    </>
  );
};

export default DashboardCustomersOrders;
