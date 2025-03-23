"use client";

import { Button } from "@/components/ui/button";
import { useGetSingleOrderQuery } from "@/redux/features/order/orders/ordersApi";
import { TMainOrder, TOrderStatus } from "@/types/Orderstype";
import { addDays, format } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BsBoxSeam } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";
import { TbTruckDelivery } from "react-icons/tb";
import DashboardCustomersOrderDetailsCart from "./Customers.Order.Details.Cart";
import Image from "next/image";

const DashboardCustomersOrderDetails = () => {
  const params = useParams();
  const { data } = useGetSingleOrderQuery(params.id);
  const singleOrder: TMainOrder = data?.data;
  return (
    <div className="mb-10">
      {/* Header Section */}
      <div className="flex items-center justify-between pt-5 sm:pt-0">
        <h2 className="flex items-center text-xl font-semibold text-primary sm:text-2xl">
          <FaShoppingBag className="mr-2 text-2xl text-primary sm:mr-3 sm:text-3xl" />
          My Orders
        </h2>
        <Link href="/orders">
          <Button className="button">Back To Orders</Button>
        </Link>
      </div>

      {/* Order Status */}
      <div className="mt-10 rounded-md bg-white px-5 py-10 shadow-sm transition-all duration-300 ease-in hover:shadow-md">
        <div className="flex items-center">
          {/* Pending or Processing */}
          <div className="relative rounded-full bg-primary p-4 text-2xl text-white">
            <BsBoxSeam size={24} />
            {(singleOrder?.status === TOrderStatus.SHIPPED ||
              singleOrder?.status === TOrderStatus.DELIVERED) && (
              <span className="absolute -right-2 -top-1 rounded-full bg-slate-200 p-1 text-lg text-green-600">
                <FcCheckmark />
              </span>
            )}
          </div>

          <span
            className={`w-full border-t-4 ${
              singleOrder?.status === TOrderStatus.SHIPPED ||
              singleOrder?.status === TOrderStatus.DELIVERED
                ? "border-primary"
                : "border-slate-200"
            }`}
          />

          {/* Shipped */}
          <div
            className={`relative rounded-full p-4 text-2xl ${
              singleOrder?.status === TOrderStatus.SHIPPED ||
              singleOrder?.status === TOrderStatus.DELIVERED
                ? "bg-primary text-white"
                : "bg-slate-200 text-primary"
            }`}
          >
            <TbTruckDelivery size={24} />
            {singleOrder?.status === TOrderStatus.DELIVERED && (
              <span className="absolute -right-2 -top-1 rounded-full bg-slate-200 p-1 text-lg text-green-600">
                <FcCheckmark />
              </span>
            )}
          </div>

          <span
            className={`w-full border-t-4 ${
              singleOrder?.status === TOrderStatus.DELIVERED
                ? "border-primary"
                : "border-slate-200"
            }`}
          />

          {/* Delivered */}
          <div
            className={`relative rounded-full p-4 text-2xl ${
              singleOrder?.status === TOrderStatus.DELIVERED
                ? "bg-primary text-white"
                : "bg-slate-200 text-primary"
            }`}
          >
            <Image src="/public/logo/deliveryIcon.svg" alt="" />
            {singleOrder?.status === TOrderStatus.DELIVERED && (
              <span className="absolute -right-2 -top-1 rounded-full bg-slate-200 p-1 text-lg text-green-600">
                <FcCheckmark />
              </span>
            )}
          </div>
        </div>

        {/* Estimated Delivery Date */}
        {singleOrder?.status !== TOrderStatus.DELIVERED && (
          <div className="mt-10 flex justify-end">
            <p className="rounded-full bg-primary/10 px-4 py-1 text-primary">
              Estimated Delivery Date:{" "}
              <span className="font-semibold">
                {singleOrder?.createdAt
                  ? format(addDays(singleOrder?.createdAt, 5), "dd-MMMM-yyyy")
                  : "N/A"}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Product List Container */}
      <DashboardCustomersOrderDetailsCart singleOrder={singleOrder} />

      {/* Shipping & Payment Section */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Shipping Address */}
        <section className="rounded-lg bg-white p-6 shadow-sm transition-all duration-300 ease-in hover:shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Shipping Address
          </h3>
          <address className="space-y-3 text-base not-italic">
            {singleOrder?.shippingAddress?.name && (
              <p className="text-foreground">
                <span className="text-muted-foreground">Name: </span>
                {singleOrder?.shippingAddress?.name}
              </p>
            )}
            {singleOrder?.shippingAddress?.address && (
              <p className="text-foreground">
                <span className="text-muted-foreground">Address: </span>
                {singleOrder?.shippingAddress?.address}
              </p>
            )}
            {
              <p className="text-foreground">
                <span className="text-muted-foreground">Region: </span>
                {[
                  singleOrder?.shippingAddress?.area,
                  singleOrder?.shippingAddress?.city,
                  singleOrder?.shippingAddress?.street,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            }
            <div className="space-y-1">
              {singleOrder?.shippingAddress?.phoneNumber && (
                <p className="text-foreground">
                  <span className="text-muted-foreground">Phone:</span>{" "}
                  {singleOrder?.shippingAddress?.phoneNumber}
                </p>
              )}
              {singleOrder?.shippingAddress?.email && (
                <p className="text-foreground">
                  <span className="text-muted-foreground">Email:</span>{" "}
                  {singleOrder?.shippingAddress?.email}
                </p>
              )}
            </div>
          </address>
        </section>

        {/* Payment Summary */}
        <section className="rounded-lg bg-white p-6 shadow-sm transition-all duration-300 ease-in hover:shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Payment Summary
          </h3>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal:</dt>
              <dd className="text-foreground">
                ${singleOrder?.totalAmount?.toFixed(2)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping:</dt>
              <dd className="text-foreground">$10.00</dd>
            </div>
            {/* <div className="flex justify-between">
              <dt className="text-muted-foreground">Discount:</dt>
              <dd className="text-destructive">-${(0.0).toFixed(2)}</dd>
            </div> */}
            <div className="flex justify-between border-t pt-3">
              <dt className="font-semibold text-foreground">Total:</dt>
              <dd className="text-xl font-bold text-primary">
                ${((singleOrder?.totalAmount ?? 0) + 10).toFixed(2)}
              </dd>
            </div>
            <div className="pt-3">
              <p className="text-sm text-muted-foreground">
                Payment Method:{" "}
                <span className="font-medium capitalize text-foreground">
                  {singleOrder?.paymentMethod}
                </span>
              </p>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
};

export default DashboardCustomersOrderDetails;
