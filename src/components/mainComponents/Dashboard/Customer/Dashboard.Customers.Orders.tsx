"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useGetMyOrdersQuery } from "@/redux/features/order/orders/ordersApi";
import { TOrderStatus, TSubOrder } from "@/types/Orderstype";
import { format } from "date-fns";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaCreditCard, FaPaypal, FaShoppingBag } from "react-icons/fa";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

const DashboardCustomersOrders = () => {
  const { data, isLoading, isError } = useGetMyOrdersQuery("");
  const orders: TSubOrder[] = data?.data || [];

  const getPaymentIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "credit card":
        return <FaCreditCard className="mr-1 inline" />;
      case "paypal":
        return <FaPaypal className="mr-1 inline" />;
      default:
        return null;
    }
  };

  if (isError) return <div className="text-red-500">Error loading orders</div>;

  return (
    <div className="mb-6 rounded-lg bg-white p-5 shadow-sm sm:p-10">
      <h2 className="flex items-center text-xl font-semibold text-primary sm:text-2xl">
        <FaShoppingBag className="mr-2 text-2xl text-primary sm:mr-3 sm:text-3xl" />
        My Orders
      </h2>

      <div className="mt-4">
        {/* Desktop Table (Original Design) */}
        <div className="hidden overflow-x-auto md:block">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-6 items-center gap-4 bg-slate-200 p-5 text-sm font-medium text-gray-600">
              <div>Order #</div>
              <div>Status</div>
              <div>Date Purchased</div>
              <div>Payment</div>
              <div>Method</div>
              <div>Total</div>
            </div>

            {isLoading ? (
              <div>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="my-3 h-16 w-full" />
                ))}
              </div>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <Link key={order._id} href={`/orders/${order._id}`}>
                  <div className="my-3 grid grid-cols-6 items-center gap-4 bg-slate-50 px-5 py-8 text-sm shadow-sm transition-all duration-300 ease-in-out hover:bg-slate-100 hover:shadow">
                    <div className="font-medium text-primary">
                      #{order._id.slice(0, 8)}...
                    </div>
                    <div>
                      <Badge
                        variant="default"
                        className={cn(
                          {
                            [TOrderStatus.PENDING]:
                              "bg-amber-500 hover:bg-amber-600",
                            [TOrderStatus.PROCESSING]:
                              "bg-amber-500 hover:bg-amber-600",
                            [TOrderStatus.DELIVERED]:
                              "bg-green-500 hover:bg-green-600",
                            [TOrderStatus.SHIPPED]:
                              "bg-purple-500 hover:bg-purple-600",
                            [TOrderStatus.CANCELLED]:
                              "bg-red-500 hover:bg-red-600",
                          }[order.status],
                          "capitalize text-white",
                        )}
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div>
                      {order.createdAt
                        ? format(order.createdAt, "dd MMM yyyy")
                        : "N/A"}
                    </div>
                    <div className="flex items-center gap-1">
                      {order.isPaid ? (
                        <IoCheckmarkCircle className="text-green-500" />
                      ) : (
                        <IoCloseCircle className="text-red-500" />
                      )}
                      <span>{order.isPaid ? "Paid" : "Unpaid"}</span>
                    </div>
                    <div className="flex items-center">
                      {getPaymentIcon(order.paymentMethod)}
                      {order.paymentMethod}
                    </div>
                    <div className="flex items-center justify-between font-semibold">
                      <span>${order.totalAmount}</span>
                      <AiOutlineArrowRight className="text-gray-400" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center py-8 text-center text-gray-500">
                <FaShoppingBag className="mb-4 text-4xl text-gray-300" />
                <p className="max-w-[300px]">
                  No orders found. Start shopping to see your orders here!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Mobile View */}
        <div className="md:hidden">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center text-gray-500">
              <FaShoppingBag className="mb-4 text-4xl text-gray-300" />
              <p className="max-w-[240px]">
                No orders found. Start shopping to see your orders here!
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <Link key={order._id} href={`/orders/${order._id}`}>
                <div className="my-3 rounded-lg border p-4 transition-all hover:border-primary/20 hover:bg-primary/5">
                  <div className="space-y-4">
                    {/* Order Header */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium text-primary">
                          #{order._id.slice(0, 8)}...
                        </div>
                        <div className="text-sm text-gray-500">
                          {format(order.createdAt, "dd MMM yyyy")}
                        </div>
                      </div>
                      <Badge
                        variant="default"
                        className={cn(
                          {
                            [TOrderStatus.PENDING]:
                              "bg-amber-500 hover:bg-amber-600",
                            [TOrderStatus.PROCESSING]:
                              "bg-amber-500 hover:bg-amber-600",
                            [TOrderStatus.DELIVERED]:
                              "bg-green-500 hover:bg-green-600",
                            [TOrderStatus.SHIPPED]:
                              "bg-purple-500 hover:bg-purple-600",
                            [TOrderStatus.CANCELLED]:
                              "bg-red-500 hover:bg-red-600",
                          }[order.status],
                          "text-xs capitalize text-white",
                        )}
                      >
                        {order.status}
                      </Badge>
                    </div>

                    {/* Order Details */}
                    <div className="grid gap-3 text-sm">
                      <div className="flex justify-between">
                        <div className="text-gray-500">Total Amount</div>
                        <div className="font-semibold">
                          ${order.totalAmount}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <div className="text-gray-500">Payment Status</div>
                        <div className="flex items-center gap-1">
                          {order.paymentStatus ? (
                            <>
                              <IoCheckmarkCircle className="text-green-500" />
                              <span className="text-green-600">Paid</span>
                            </>
                          ) : (
                            <>
                              <IoCloseCircle className="text-red-500" />
                              <span className="text-red-600">Pending</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <div className="text-gray-500">Payment Method</div>
                        <div className="flex items-center gap-1">
                          {getPaymentIcon(order.paymentMethod)}
                          <span className="truncate">
                            {order.paymentMethod}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* View Button */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-gray-500">
                        Tap to view details
                      </span>
                      <AiOutlineArrowRight className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomersOrders;
