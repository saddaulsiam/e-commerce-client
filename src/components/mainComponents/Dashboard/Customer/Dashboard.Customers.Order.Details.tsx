"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsBagFill, BsBoxSeam } from "react-icons/bs";
import { FcCheckmark } from "react-icons/fc";
import { FiShoppingBag } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { useGetSingleOrderQuery } from "../../../../redux/features/order/orders/ordersApi";
import { Loading } from "../../../sharedComponents";
import DashboardCustomerSideBarNavigation from "./Dashboard.Customer.SideBar.Navigation";
import DashboardCustomersOrderDetailsCart from "./Dashboard.Customers.Order.Details.Cart";

const DashboardCustomersOrderDetails = () => {
  const router = useRouter();
  const [showSideNavigation, setShowSideNavigation] = useState(null);

  const { data: order, isLoading } = useGetSingleOrderQuery(router.query.id);
  console.log(order);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mb-10">
          <div className="grid grid-cols-2 gap-y-5">
            <div className="flex items-center">
              <h2 className="text-2xl font-semibold text-primary">
                <BsBagFill className="mr-3 inline text-2xl text-primary" />
                <span>My Orders</span>
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
              <Link href="/customer/orders">
                <button className="button">Back To Orders</button>
              </Link>
            </div>
          </div>
          <div className="mt-10 rounded-md bg-white px-5 py-10 shadow">
            <div className="flex items-center">
              <span className="relative rounded-full bg-primary p-4 text-2xl text-white">
                <BsBoxSeam />
                <span className="absolute -right-1 -top-1 rounded-full bg-slate-200 p-1 text-base text-green-600">
                  <FcCheckmark />
                </span>
              </span>
              <div className="w-full border-t-4 border-primary" />
              <span className="rounded-full bg-primary p-4 text-2xl text-white">
                <TbTruckDelivery />
              </span>
              <div className="w-full border-t-4 border-slate-300" />
              <span className="rounded-full bg-slate-300 p-4 text-2xl text-primary">
                <FiShoppingBag />
              </span>
            </div>
            <div className="mt-10 flex justify-end">
              <p className="rounded-full bg-red-200 px-4 py-1 text-secondary">
                Estimated Delivery Date {order?.data?.orderDate.split("T")[0]}
              </p>
            </div>
          </div>
          <DashboardCustomersOrderDetailsCart order={order?.data} />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-md bg-white p-5">
              <h3 className="mb-5 text-base font-semibold text-my-gray-200">
                Shipping Address
              </h3>
              <div className="space-y-3">
                <h3>Name: {order?.data?.shippingAddress?.name}</h3>
                <p className="">
                  Address:
                  <span className="rounded-full bg-orange-500 px-1.5 text-white">
                    Home
                  </span>{" "}
                  {order?.data?.shippingAddress?.address}
                </p>
                <p>
                  Region: {order?.data?.shippingAddress?.area}-
                  {order?.data?.shippingAddress?.city}-
                  {order?.data?.shippingAddress?.region}
                </p>
                <p className="">Phone: {order?.data?.shippingAddress?.phone}</p>

                {order?.data?.shippingAddress?.email && (
                  <p className="">
                    email: {order?.data?.shippingAddress?.email}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2 rounded-md bg-white p-5">
              <h3 className="text-base font-semibold text-my-gray-200">
                Total Summary
              </h3>
              <div className="flex justify-between">
                <p className="text-my-gray-100">Subtotal:</p>
                <p>${order?.data?.total}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-my-gray-100">Shipping fee:</p>
                <p>$10</p>
              </div>
              <div className="flex justify-between">
                <p className="text-my-gray-100">Discount:</p>
                <p>-$10</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p>Total</p>
                <p>$ {order?.data?.total + 10 - 10}</p>
              </div>
              <p className="text-my-gray-100">
                Paid by: {order?.data?.paymentDetails?.paymentType}
              </p>
            </div>
          </div>
        </div>
      )}
      {showSideNavigation && (
        <DashboardCustomerSideBarNavigation
          setShowSideNavigation={setShowSideNavigation}
        />
      )}
    </>
  );
};

export default DashboardCustomersOrderDetails;
