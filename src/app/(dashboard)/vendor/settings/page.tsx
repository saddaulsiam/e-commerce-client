"use client";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

const VendorAccountProfile = () => {
  const router = useRouter();
  const { user } = useAppSelector(({ state }) => state.auth);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Page Title */}
      <h2 className="pt-3 text-2xl font-semibold text-gray-800">
        Vendor Profile
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
            src="https://images.pexels.com/photos/1827234/pexels-photo-1827234.jpeg?auto=compress&cs=tinysrgb&w=1600"
            priority
          />
        </div>

        {/* Logo Section */}
        <div className="relative -mt-12 flex justify-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <Image
              layout="fill"
              className="object-cover"
              src="https://images.pexels.com/photos/176837/pexels-photo-176837.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Store Logo"
            />
          </div>
        </div>

        {/* Store Details */}
        <div className="space-y-4 p-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-800">
            Awesome Store
          </h3>
          <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
            <div className="rounded-lg bg-gray-100 p-4 shadow">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium text-gray-800">
                awesome@store.com
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 p-4 shadow">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg font-medium text-gray-800">+123 456 7890</p>
            </div>
            <div className="col-span-2 rounded-lg bg-gray-100 p-4 shadow">
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-lg font-medium text-gray-800">
                123 Store Street, Shop City
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorAccountProfile;
