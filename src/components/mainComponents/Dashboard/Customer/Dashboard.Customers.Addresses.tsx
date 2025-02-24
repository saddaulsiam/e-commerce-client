"use client";

import Link from "next/link";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLocationPin, MdModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// local
import { useRemoveAddressToUserMutation } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hooks";
import { addUser } from "../../../../redux/features/auth/authSlice";
import DashboardCustomerSideBarNavigation from "./Dashboard.Customer.SideBar.Navigation";

const DashboardCustomersAddresses = () => {
  const dispatch = useDispatch();
  const [showSideNavigation, setShowSideNavigation] = useState(null);
  const { user } = useAppSelector(({ state }) => state.auth);

  const [removeAddress] = useRemoveAddressToUserMutation();

  const handleDelete = (addressId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeAddress({ userId: user._id, addressId }).then((res) => {
          if (res.data?.status === "success") {
            toast.success(res.data?.message);
            dispatch(addUser(res.data.data));
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-y-5">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-primary">
            <MdLocationPin className="mr-3 inline text-3xl text-primary" />
            <span> My Profile</span>
          </h2>
        </div>
        <div className="flex justify-end lg:hidden">
          <button className="text-2xl font-thin " onClick={() => setShowSideNavigation(true)}>
            <GiHamburgerMenu />
          </button>
        </div>
        <div className="flex lg:justify-end">
          <Link href="/customer/addresses/new">
            <button className="button">Add New Addresses</button>
          </Link>
        </div>
      </div>
      <div className="mt-5 bg-white p-5">
        <div className="grid grid-cols-12 gap-5 rounded-md bg-slate-300/80 p-3 text-sm text-my-gray-200 sm:text-base">
          <p className="col-span-4 lg:col-span-2">Full Name</p>
          <p className="col-span-4 lg:col-span-2">Address</p>
          <p className="col-span-4 lg:col-span-3">Region</p>
          <p className="col-span-4 lg:col-span-2">Phone</p>
          <p className="col-span-4 lg:col-span-2">Email</p>
          <p className="col-span-4 lg:col-span-1">Action</p>
        </div>
        {user?.shippingAddress?.map((address, i) => (
          <div key={i} className="grid grid-cols-12 items-center gap-5 rounded-md p-3 text-xs text-my-gray-200">
            <p className="col-span-4 lg:col-span-2">{address.name}</p>
            <p className="col-span-4 lg:col-span-2">
              <span className="rounded-full bg-orange-500 px-1.5 text-white">{address.addressType}</span>{" "}
              {address.address}
            </p>
            <p className="col-span-4 lg:col-span-3">
              {address.region}-{address.city}-{address.area}
            </p>
            <p className="col-span-4 lg:col-span-1">{address.phone}</p>
            <p className="col-span-4 flex lg:col-span-3 lg:justify-center">{address.email}</p>
            <p className="col-span-4 flex justify-end text-xl lg:col-span-1">
              <Link href="/customer/addresses/edit">
                <span className="inline-flex cursor-pointer rounded-full p-3 hover:bg-slate-100">
                  <MdModeEdit />
                </span>
              </Link>
              <span
                onClick={() => handleDelete(address._id)}
                className="inline-flex cursor-pointer rounded-full p-3 hover:bg-slate-100"
              >
                <AiFillDelete />
              </span>
            </p>
            <hr className="col-span-12" />
          </div>
        ))}
      </div>
      {showSideNavigation && <DashboardCustomerSideBarNavigation setShowSideNavigation={setShowSideNavigation} />}
    </div>
  );
};

export default DashboardCustomersAddresses;
