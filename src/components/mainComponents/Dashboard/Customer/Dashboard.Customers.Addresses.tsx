"use client";

import { Loading } from "@/components/sharedComponents/loader";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useAuth from "@/hooks/useAuth";
import { useRemoveAddressMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { MdDelete, MdEmail, MdLocationPin, MdPhone } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const DashboardCustomersAddresses = () => {
  const { setLoadUser } = useAuth();
  const { user } = useAppSelector(({ state }) => state.auth);
  const [removeAddress, { isLoading }] = useRemoveAddressMutation();

  const handleDelete = async (id: string) => {
    Swal.fire({
      icon: "warning",
      title: "Confirm Address Removal",
      text: "Are you sure you want to delete this address? This action cannot be undone.",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await removeAddress(id).unwrap();
          if (res.success) {
            toast.success("Address has been successfully removed.");
            setLoadUser(true);
          }
        } catch (error: any) {
          toast.error(error.message);
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm md:p-10">
      <div className="flex items-center justify-between gap-4 pb-10">
        <h2 className="flex items-center text-xl font-semibold text-primary sm:text-2xl">
          <MdLocationPin className="mr-2 text-2xl text-primary sm:mr-3 sm:text-3xl" />
          My Addresses
        </h2>
        <Link href="/addresses/new">
          <Button>Add New Address</Button>
        </Link>
      </div>

      <div className="md:hidden">
        {user?.profile.address?.length ? (
          user.profile.address.map((address, i) => (
            <div
              key={i}
              className="group mb-4 rounded-lg border p-4 transition-all hover:border-primary/20 hover:bg-primary/5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{address.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(address?._id as string)}
                    className="h-9 w-9 text-red-500 hover:bg-red-100"
                  >
                    <MdDelete className="text-lg" />
                  </Button>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-start gap-2">
                    <MdLocationPin className="mt-1 shrink-0 text-gray-400" />
                    <span className="break-words">{address.address}</span>
                  </p>
                  <p className="ml-6 text-gray-500">
                    {[address.area, address.city, address.street]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  <p className="flex items-center gap-2">
                    <MdPhone className="text-gray-400" />
                    {address.phoneNumber}
                  </p>
                  <p className="flex items-center gap-2 text-primary">
                    <MdEmail className="text-gray-400" />
                    {address.email}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center py-8 text-center text-gray-500">
            <MdLocationPin className="mb-4 text-4xl text-gray-300" />
            <p className="max-w-[240px]">
              No addresses found. Add your first address to get started!
            </p>
          </div>
        )}
      </div>

      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-lg border">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-12 items-center gap-4 bg-slate-50 px-4 py-3 text-sm font-medium text-gray-600">
              <div className="col-span-2">Full Name</div>
              <div className="col-span-2">Address</div>
              <div className="col-span-3">Region</div>
              <div className="col-span-2">Phone</div>
              <div className="col-span-2">Email</div>
              <div className="col-span-1">Actions</div>
            </div>

            {user?.profile.address?.length ? (
              user.profile.address.map((address, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 items-center gap-4 border-t px-4 py-4 text-sm transition-colors hover:bg-slate-50"
                >
                  <div className="col-span-2 truncate font-medium text-gray-900">
                    {address.name}
                  </div>
                  <div className="col-span-2 truncate text-gray-600">
                    {address.address}
                  </div>
                  <div className="col-span-3 truncate text-gray-600">
                    {[address.area, address.city, address.street]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                  <div className="col-span-2 text-gray-600">
                    {address.phoneNumber}
                  </div>
                  <div className="col-span-2 truncate text-primary">
                    {address.email}
                  </div>
                  <div className="col-span-1 flex items-end justify-end gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(address?._id as string)}
                          className="h-8 w-8 text-red-500 hover:bg-red-100"
                        >
                          <MdDelete className="text-lg" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete Address</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center py-12 text-center text-gray-500">
                <MdLocationPin className="mb-4 text-4xl text-gray-300" />
                <p className="max-w-[300px]">
                  No addresses found. Add your first address to get started!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomersAddresses;
