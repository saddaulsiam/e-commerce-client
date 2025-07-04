"use client";

import { addOrderDetails } from "@/redux/features/order/orderDetails/orderDetailsSlice";
import { useAppSelector } from "@/redux/hooks";
import { TAddress } from "@/types/common";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiMinusCircle, HiOutlinePlusCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";
import CreateAddressForm from "../../sharedComponents/forms/CreateAddressForm";
import CartSummary from "./CartSummary";
import ProgressSteps from "./ProgressSteps";
import { Button } from "@/components/ui/button";

const ProductCheckout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useAppSelector(({ state }) => state.cart);
  const { user } = useAppSelector(({ state }) => state.auth);

  const [address, setAddress] = useState<TAddress | null>(null);
  const [toggleAddressForm, setToggleAddressForm] = useState<boolean>(false);

  const handleSubmit = () => {
    try {
      if (address) {
        dispatch(addOrderDetails(address));
        router.push("/payment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-accent">
      <div className="container px-2 pb-32">
        <ProgressSteps />

        {user && user?.profile?.address?.length > 0 && (
          <div>
            <p className="pb-3 text-xl font-bold text-primary">
              Select Your Address
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-3 lg:col-span-2">
            {/* Show exiting Address */}
            {user && user?.profile?.address?.length > 0 && (
              <div className="overflow-x-auto rounded-lg bg-white shadow-md">
                <table className="min-w-full">
                  <thead className="bg-gray-100 text-sm font-semibold text-gray-600">
                    <tr>
                      <th className="px-4 py-3 text-left">Select</th>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">Phone</th>
                      <th className="px-4 py-3 text-left">Street</th>
                      <th className="px-4 py-3 text-left">Area</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user?.profile?.address.map((address, i) => (
                      <tr
                        key={i}
                        className="border-b transition duration-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3">
                          <input
                            type="radio"
                            name="radio-1"
                            className="accent-primary"
                            onChange={(e) =>
                              e.currentTarget.checked && setAddress(address)
                            }
                          />
                        </td>
                        <td className="px-4 py-3">{address?.name}</td>
                        <td className="px-4 py-3">{address?.email || "N/A"}</td>
                        <td className="px-4 py-3">{address?.phoneNumber}</td>
                        <td className="px-4 py-3">{address?.street}</td>
                        <td className="px-4 py-3">
                          {address?.area},{address?.city},{address?.region}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Address Form Toggle Button */}
            {user && user.profile?.address?.length > 0 && (
              <div className="my-5">
                {!toggleAddressForm ? (
                  <p
                    className="flex cursor-pointer items-center pb-3 text-lg text-green-500"
                    onClick={() => setToggleAddressForm(true)}
                  >
                    <HiOutlinePlusCircle className="mr-1 inline text-2xl" />
                    <span>Add New Address</span>
                  </p>
                ) : (
                  <p
                    className="flex cursor-pointer items-center pb-3 text-lg text-primary"
                    onClick={() => setToggleAddressForm(false)}
                  >
                    <HiMinusCircle className="mr-1 inline text-2xl" />
                    <span>Close Address Form</span>
                  </p>
                )}
              </div>
            )}

            {/* Show Address Form when toggled */}
            {toggleAddressForm && <CreateAddressForm />}

            {/* Show Address Form if no addresses are available */}
            {user?.profile?.address?.length === 0 && <CreateAddressForm />}

            {user &&
              user?.profile?.address?.length > 0 &&
              !toggleAddressForm && (
                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/cart")}
                    className="w-full border-primary py-2 text-center text-base font-semibold text-primary transition duration-200 ease-in-out hover:bg-primary hover:text-white"
                  >
                    Back to Cart
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className={`${
                      !address ? "cursor-not-allowed opacity-50" : ""
                    } w-full bg-primary py-2 text-base font-semibold text-white`}
                    disabled={!address}
                  >
                    Proceed to Payment
                  </Button>
                </div>
              )}
          </div>

          <div className="col-span-3 lg:col-span-1">
            <CartSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCheckout;
