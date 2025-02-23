"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiMinusCircle, HiOutlinePlusCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";

// local
import { useAppSelector } from "@/redux/hooks";
import { addOrderDetails } from "../../../redux/features/orders/orderDetails/orderDetailsSlice";
import { Footer, Navbar } from "../../sharedComponents";
import { DashboardCustomersAddressFillUpForm } from "../Dashboard/Customer";
import OrderSummaryCart from "./OrderSummaryCart";

const OrderProductDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { products } = useAppSelector((state) => state.persistedReducer.cart);
  const { user } = useAppSelector((state) => state.persistedReducer.auth);

  const [address, setAddress] = useState(null);
  const [toggleAddressFrom, setToggleAddressFrom] = useState(false);

  const handleSubmit = (e) => {
    try {
      dispatch(addOrderDetails(address));
      router.push("/payment");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-slate-200">
      <Navbar />
      <div className="container mt-32 lg:mt-[10.9rem] ">
        <div className="flex items-center py-10">
          <Link href="/cart">
            <button className="cursor-pointer rounded-full bg-primary py-2 px-6 text-sm font-semibold text-white">
              <span className="hidden sm:block">1. Cart</span>
              <span className="sm:hidden">Cart</span>
            </button>
          </Link>
          <div className="w-20 border-t-4 border-primary" />
          <Link href="/details">
            <button
              disabled={products.length < 1 ? true : false}
              className="cursor-pointer rounded-full bg-primary py-2 px-6 text-sm font-semibold text-white"
            >
              <span className="hidden sm:block">2. Details</span>
              <span className="sm:hidden">Details</span>
            </button>
          </Link>
          <div className="w-20 border-t-4 border-secondary" />
          <Link href="/payment">
            <button className="cursor-pointer rounded-full bg-secondary py-2 px-6 text-sm font-semibold text-white">
              <span className="hidden sm:block">3. Payment</span>
              <span className="sm:hidden">Payment</span>
            </button>
          </Link>
          <div className="w-20 border-t-4 border-secondary" />
          <Link href="/review">
            <button className="cursor-pointer rounded-full bg-secondary py-2 px-6 text-sm font-semibold text-white">
              <span className="hidden sm:block">4. Review</span>
              <span className="sm:hidden">Review</span>
            </button>
          </Link>
        </div>
        {user?.shippingAddress?.length > 0 && (
          <div>
            <p className="pb-3 text-xl font-bold text-primary">Select Your Address</p>
          </div>
        )}

        <div className="mb-10	grid grid-cols-3 gap-5">
          <div className="col-span-3 lg:col-span-2">
            {user?.shippingAddress?.length > 0 && (
              <div className="overflow-x-auto">
                <table className="table min-w-full ">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Region</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user?.shippingAddress?.map((address, i) => (
                      <tr key={i}>
                        <th>
                          <div className="form-control">
                            <input
                              type="radio"
                              name="radio-1"
                              className="radio checked:bg-secondary"
                              onChange={(e) => {
                                if (e.currentTarget.checked) {
                                  setAddress(address);
                                }
                              }}
                            />
                          </div>
                        </th>
                        <td>{address.name}</td>
                        <td>
                          {address.addressType} {address.address}
                        </td>
                        <td>
                          {address.region}-{address.city}-{address.area}
                        </td>
                        <td>{address.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {user?.shippingAddress?.length > 0 && (
              <div className="my-5">
                {!toggleAddressFrom ? (
                  <p
                    className="flex cursor-pointer items-center pb-3 text-lg text-green-500"
                    onClick={() => setToggleAddressFrom(true)}
                  >
                    <HiOutlinePlusCircle className="mr-1 inline text-2xl" />
                    <span>Add New Address</span>
                  </p>
                ) : (
                  <p
                    className="flex cursor-pointer items-center pb-3 text-lg text-secondary"
                    onClick={() => setToggleAddressFrom(false)}
                  >
                    <HiMinusCircle className="mr-1 inline text-2xl" />
                    <span>Close Address From</span>
                  </p>
                )}
              </div>
            )}
            {/* AddressFillUpForm */}

            {toggleAddressFrom && <DashboardCustomersAddressFillUpForm />}
            {user?.shippingAddress?.length <= 0 ? (
              <DashboardCustomersAddressFillUpForm />
            ) : (
              <div className="hidden">
                <DashboardCustomersAddressFillUpForm />
              </div>
            )}

            {user?.shippingAddress?.length <= 0 ||
              (!toggleAddressFrom && (
                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <span
                    onClick={() => router.push("/cart")}
                    className="w-full transform cursor-pointer border border-primary py-2 text-center text-base font-semibold text-primary transition duration-100 ease-in-out hover:bg-primary hover:text-white"
                  >
                    Back to Cart
                  </span>
                  <button
                    onClick={handleSubmit}
                    className={`${
                      address === null ? "cursor-not-allowed" : ""
                    } w-full bg-primary py-2 text-base font-semibold text-white`}
                  >
                    Proceed to Payment
                  </button>
                </div>
              ))}
          </div>

          <div className="col-span-3 lg:col-span-1">
            <OrderSummaryCart products={products} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderProductDetails;
