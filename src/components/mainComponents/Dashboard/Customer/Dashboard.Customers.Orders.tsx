"use client";

import { Loading } from "@/components/sharedComponents";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useGetMyOrdersQuery } from "@/redux/features/order/orders/ordersApi";
import { TOrderStatus, TSubOrder } from "@/types/Orderstype";
import { format } from "date-fns";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";

const DashboardCustomersOrders = () => {
  const { data, isLoading, isError } = useGetMyOrdersQuery("");
  const orders: TSubOrder[] = data?.data || [];

  // Handle loading and error states first
  if (isLoading) return <Loading />;
  if (isError) return <div className="text-red-500">Error loading orders</div>;

  return (
    <div className="mb-10">
      <h2 className="flex items-center text-2xl font-semibold text-primary">
        <FaShoppingBag className="mr-3 inline text-2xl text-primary" />
        My Orders
      </h2>

      <div>
        <ul className="mt-8 grid grid-cols-6 px-5 text-sm font-semibold text-my-gray-100 sm:text-base">
          <li>Order #</li>
          <li>Status</li>
          <li>Date Purchased</li>
          <li>Is Paid</li>
          <li>Payment Method</li>
          <li>Total</li>
        </ul>

        {orders.length === 0 ? (
          <div className="mt-4 text-center text-gray-500">No orders found</div>
        ) : (
          orders
            .map(
              ({
                _id,
                status,
                createdAt,
                totalAmount,
                paymentStatus,
                paymentMethod,
              }) => (
                <Link key={_id} href={`/orders/${_id}`}>
                  <ul className="my-3 grid cursor-pointer grid-cols-6 rounded-md bg-white px-5 py-5 text-base font-light text-my-gray-200 shadow">
                    <li className="text-sm text-black sm:text-lg">
                      {_id.slice(0, 8)}...
                    </li>
                    <li>
                      <Badge
                        variant="default"
                        className={cn(
                          {
                            [TOrderStatus.PENDING]: "bg-primary",
                            [TOrderStatus.PROCESSING]: "bg-primary",
                            [TOrderStatus.DELIVERED]:
                              "bg-green-500 hover:bg-green-600",
                            [TOrderStatus.SHIPPED]:
                              "bg-blue-500 hover:bg-blue-600",
                            [TOrderStatus.CANCELLED]:
                              "bg-red-500 hover:bg-red-600",
                          }[status],
                          "capitalize",
                        )}
                      >
                        {status}
                      </Badge>
                    </li>
                    <li className="text-sm sm:text-base">
                      {createdAt ? format(createdAt, "dd-MMMM-yyyy") : "N/A"}
                    </li>
                    <li className="text-sm sm:text-base">
                      {typeof paymentStatus === "boolean"
                        ? paymentStatus
                          ? "Paid"
                          : "Not Paid"
                        : paymentStatus || "N/A"}
                    </li>
                    <li className="text-sm sm:text-base">
                      {paymentMethod || "N/A"}
                    </li>
                    <li className="flex justify-between text-sm sm:text-base">
                      <span>$ {totalAmount}</span>
                      <span className="cursor-pointer rounded-full p-2 transition duration-200 ease-in-out hover:bg-slate-200 sm:text-lg">
                        <AiOutlineArrowRight />
                      </span>
                    </li>
                  </ul>
                </Link>
              ),
            )
            .reverse()
        )}
      </div>
    </div>
  );
};

export default DashboardCustomersOrders;
