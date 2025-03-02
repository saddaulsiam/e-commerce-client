"use client";
import { Loading } from "@/components/sharedComponents";
import { Button } from "@/components/ui/button";
import { useGetSingleOrderQuery } from "@/redux/features/order/orders/ordersApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsBagFill, BsBoxSeam } from "react-icons/bs";
import { FcCheckmark } from "react-icons/fc";
import { FiShoppingBag } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import VendorOrderDetailsCart from "./Vendor.Order.Details.Cart";
// import { DashboardSideBarNavigation } from "../Common";

const VendorOrderDetails = () => {
  const router = useRouter();
  const [showSideNavigation, setShowSideNavigation] = useState(null);

  const { data: order, isLoading } = useGetSingleOrderQuery(router.query.id);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mb-10">
          <div className="grid grid-cols-2 gap-y-5 print:hidden">
            <div>
              <h2 className="text-2xl font-semibold text-primary">
                <BsBagFill className="mr-3 inline text-2xl text-primary" />
                <span>Order Details</span>
              </h2>
            </div>

            <div className="flex justify-end">
              <Link href="/vendor/orders">
                <Button className="bg-red-200 px-4 py-2 text-sm font-semibold text-secondary">
                  Back To Orders
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-10 rounded-md bg-white px-5 py-10 shadow print:hidden">
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

          <div className="mt-10 grid grid-cols-1 gap-10 rounded-md bg-white px-5 py-5 shadow lg:grid-cols-3 print:hidden">
            <div>
              <p className="mb-5 flex justify-center text-xl font-bold">
                Status
              </p>
              <div className="flex justify-between">
                <div>
                  <p className="mb-3 font-semibold text-my-gray-200">
                    Current Status
                  </p>
                  <p
                    className={`badge capitalize ${
                      order?.data?.status === "pending"
                        ? "badge-warning"
                        : order?.data?.status === "reject"
                          ? "badge-error"
                          : order?.data?.status === "delivery"
                            ? "badge-success"
                            : order?.data?.status === "cancel"
                              ? "badge-error"
                              : ""
                    }`}
                  >
                    {order?.data?.status}
                  </p>
                </div>
                <div>
                  <p className="mb-3 font-semibold text-my-gray-200">
                    Update Status
                  </p>
                  <p>
                    <select className="select select-accent select-sm max-w-xs capitalize">
                      <option disabled>{order?.data?.status}</option>
                      <option value="pending">pending</option>
                      <option value="cancel">cancel</option>
                      <option value="reject">reject</option>
                      <option value="delivery">delivery</option>
                    </select>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-5 flex justify-center text-xl font-bold">
                Tracking
              </p>
              <div className="flex justify-center">
                <div>
                  <p className="font-semibold text-my-gray-200">
                    Delivery by :{" "}
                    <span className="font-normal">Sundarban Courier ltd</span>
                  </p>
                  <p className="mt-3 font-semibold text-my-gray-200">
                    CN Number :{" "}
                    <span className="font-normal">10163000167843</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div>
                <p className="mb-5 text-xl font-bold">Download</p>
                <Button
                  onClick={() => window.print()}
                  className="btn btn-sm rounded-md border-0 bg-red-200 text-sm font-semibold text-secondary hover:bg-red-300 print:hidden"
                >
                  Print Order
                </Button>
              </div>
            </div>
          </div>

          <VendorOrderDetailsCart order={order?.data} />

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 print:grid-cols-2">
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
                <p>-$5</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p>Total</p>
                <p>$ {order?.data?.total + 10 - 5}</p>
              </div>
              <p className="text-my-gray-100">
                Paid by: {order?.data?.paymentDetails?.payWith}
              </p>
            </div>
          </div>

          {/* {showSideNavigation && (
            <DashboardSideBarNavigation
              setShowSideNavigation={setShowSideNavigation}
            />
          )} */}
        </div>
      )}
    </>
  );
};

export default VendorOrderDetails;
