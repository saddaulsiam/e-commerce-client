"use client";

import { useAppSelector } from "@/redux/hooks";
import { User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const VendorAccountProfile = () => {
  const router = useRouter();
  const { user } = useAppSelector(({ state }) => state.auth);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Page Title */}
      <h2 className="flex items-center pt-3 text-2xl font-bold text-gray-700">
        <User className="mr-2 text-primary" />
        Profile
      </h2>

      <div className="relative overflow-hidden rounded-lg bg-white shadow-md">
        {/* Edit Profile Button */}
        <button
          onClick={() => router.push(`/${user?.role}/settings/update`)}
          className="absolute right-4 top-4 z-10 flex cursor-pointer items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-medium text-primary shadow hover:bg-gray-100"
        >
          Edit Profile
        </button>

        {/* Banner Section */}
        <div className="relative h-72">
          <Image
            alt="Store Banner"
            layout="fill"
            className="object-cover object-center"
            src={user?.vendor.storeLogo || "/logo/storeLogo.jpeg"}
            priority
          />
        </div>

        {/* Logo Section */}
        <div className="relative -mt-12 flex justify-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <Image
              layout="fill"
              className="object-cover"
              src={user?.vendor.storeBanner || "/logo/storeBanner.jpeg"}
              alt="Store Logo"
            />
          </div>
        </div>

        {/* Store Details */}
        <div className="space-y-4 p-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-800">
            {user?.vendor.storeName}
          </h3>
          <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
            <div className="rounded-lg bg-gray-100 p-4 shadow">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium text-gray-800">{user?.email}</p>
            </div>
            <div className="rounded-lg bg-gray-100 p-4 shadow">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg font-medium text-gray-800">
                {user?.vendor.phoneNumber}
              </p>
            </div>
            <div className="col-span-2 rounded-lg bg-gray-100 p-4 shadow">
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-lg font-medium text-gray-800">
                {user?.vendor.address.street} {user?.vendor.address?.city}{" "}
                {user?.vendor.address.area}, {user?.vendor.address?.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorAccountProfile;
