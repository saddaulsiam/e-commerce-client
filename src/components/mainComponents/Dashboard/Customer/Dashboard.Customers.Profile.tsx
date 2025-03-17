"use client";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";

const DashboardCustomersProfile = () => {
  const { user } = useAppSelector(({ state }) => state.auth);

  return (
    <div className="mb-10 rounded-lg bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="mb-4 flex items-center text-2xl font-semibold text-primary">
          <MdAccountCircle className="mr-2 text-primary" /> My Profile
        </h2>
        <Link href="/profile/edit">
          <Button className="w-full hover:bg-orange-600 sm:w-auto">
            <Edit /> Edit Profile
          </Button>
        </Link>
      </div>

      {/* Profile & Order Summary */}
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="col-span-2 flex items-center rounded-lg bg-slate-100 p-5 shadow-md sm:col-span-1">
          <Image
            className="rounded-full border"
            height={60}
            width={60}
            src={
              user?.profile?.photo ||
              "https://bonik-react.vercel.app/assets/images/faces/ralph.png"
            }
            alt="User Profile"
            priority
          />
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
            { count: 16, label: "All Orders" },
            { count: 2, label: "Awaiting Payments" },
            { count: 0, label: "Awaiting Shipment" },
            { count: 1, label: "Awaiting Delivery" },
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
            { label: "Full Name", value: "Nick DuBuque" },
            { label: "Phone", value: "(445) 653-3771 x985" },
            { label: "Date Of Birth", value: "26 january 2004" },
            { label: "Email", value: "Jayden.Gislason78@gmail.com" },
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
