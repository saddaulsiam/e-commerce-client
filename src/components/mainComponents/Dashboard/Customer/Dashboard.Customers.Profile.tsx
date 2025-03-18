"use client";

import { Loading } from "@/components/sharedComponents";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetMyOrdersQuery } from "@/redux/features/order/orders/ordersApi";
import { useAppSelector } from "@/redux/hooks";
import { TOrderStatus, TSubOrder } from "@/types/Orderstype";
import { Edit } from "lucide-react";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";

const DashboardCustomersProfile = () => {
  const { user } = useAppSelector(({ state }) => state.auth);
  const { data, isLoading } = useGetMyOrdersQuery("");
  const orders: TSubOrder[] = data?.data || [];

  if (isLoading) return <Loading />;

  return (
    <div className="mb-10 rounded-lg bg-white px-4 py-6 shadow-sm sm:p-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="mb-4 flex items-center text-2xl font-semibold text-primary">
          <MdAccountCircle className="mr-2 text-primary" /> My Profile
        </h2>
        <Link href="/profile/edit">
          <Button>
            <Edit /> Edit Profile
          </Button>
        </Link>
      </div>

      {/* Profile & Order Summary */}
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="col-span-2 flex items-center rounded-lg bg-slate-100 p-5 shadow-md sm:col-span-1">
          <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
            <AvatarImage src={user?.profile?.photo || "/user-avatar.jpg"} />
            <AvatarFallback className="bg-primary/10">
              {user?.displayName?.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {user?.displayName}
            </h3>
            <p className="text-sm font-medium text-slate-400">SILVER USER</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-span-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { count: orders.length, label: "All Orders" },
            {
              count: orders.filter((order) => !order.isPaid).length,
              label: "Awaiting Payments",
            },
            {
              count: orders.filter(
                (order) => order.status === TOrderStatus.PROCESSING,
              ).length,
              label: "Awaiting Shipment",
            },
            {
              count: orders.filter(
                (order) => order.status === TOrderStatus.SHIPPED,
              ).length,
              label: "Awaiting Delivery",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-lg bg-slate-100 p-4 shadow-md"
            >
              <h2 className="text-xl font-semibold text-primary">
                {item.count.toString().padStart(2, "0")}
              </h2>
              <p className="text-center text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Information */}
      <div className="rounded-lg bg-slate-100 p-5 shadow-md">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Full Name", value: user?.displayName },
            { label: "Phone", value: user?.phoneNumber },
            { label: "Date Of Birth", value: user?.profile.birthDate },
            { label: "Email", value: user?.email },
          ].map((item, index) => (
            <div key={index}>
              <p className="text-xs text-gray-500">{item.label}</p>
              <p className="text-base font-medium text-gray-600">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomersProfile;
