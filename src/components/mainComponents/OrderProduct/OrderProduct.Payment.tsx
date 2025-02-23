"use client";

import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcOk } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { clearCart } from "../../../redux/features/cart/cartSlice";
import { removeOrderDetails } from "../../../redux/features/orders/orderDetails/orderDetailsSlice";
import { useOrderNowMutation } from "../../../redux/features/orders/orders/ordersApi";
import { Footer, Navbar } from "../../sharedComponents";
import StripePaymentModal from "../../sharedComponents/modal/Stripe.Payment.Modal";
import { SSLCommerzPaymentDetails } from "../Payment";
import SelectPaymentOption from "./OrderProductSelectPaymentOption";
import OrderSummaryCart from "./OrderSummaryCart";

const OrderProductPayment = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useAppSelector((state) => state.persistedReducer.auth);

  const cart = useAppSelector((state) => state.persistedReducer.cart);
  const { details } = useAppSelector((state) => state.persistedReducer.orderDetails);

  const [isOpen, setIsOpen] = useState(false);
  const [payWith, setPayWith] = useState("");

  const [orderNow, { data, error, isSuccess }] = useOrderNowMutation();

  // cash on delivery
  let orderTotalPrice = 0;

  products?.map((product) => {
    orderTotalPrice += product.salePrice * product.quantity;
  });

  const orderData = {
    user: {
      id: user._id,
      email: user.email,
      displayName: user.displayName,
    },

    products: products,
    shippingAddress: details,
    paymentDetails: {
      paymentType: payWith,
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
      },
    },
    orderStatus: "pending",
    paymentStatus: "unpaid",
    total: orderTotalPrice,
  };

  const handleOrder = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You confirm this order",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#003566",
      cancelButtonColor: "#e63946",
      confirmButtonText: "Yes, confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        orderNow(orderData).then((res) => {
          if (res.data?.status === "success") {
            dispatch(clearCart());
            dispatch(removeOrderDetails());
            Swal.fire({
              title: "Yeah!",
              text: res.data?.message,
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#003566",
              cancelButtonColor: "#e63946",
              confirmButtonText: "My Orders",
            }).then((res) => {
              if (res.isConfirmed) {
                router.push("/customer/orders");
              } else {
                router.push("/");
              }
            });
          }
        });
      }
    });
  };

  if (error) {
    console.log(error);
    toast.error(error?.data?.message);
  }

  const handleSSLOrder = async () => {
    fetch("http://localhost:5000/api/v1/payment/create-sslcommerz-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.replace(data.gatewayPageURL);
      })
      .finally(() => {
        dispatch(clearCart());
        dispatch(removeOrderDetails());
      });
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
            <button className="cursor-pointer rounded-full bg-primary py-2 px-6 text-sm font-semibold text-white">
              <span className="hidden sm:block">2. Details</span>
              <span className="sm:hidden">Details</span>
            </button>
          </Link>
          <div className="w-20 border-t-4 border-primary" />
          <Link href="/payment">
            <button className="cursor-pointer rounded-full bg-primary py-2 px-6 text-sm font-semibold text-white">
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
        <div className="mb-10	grid grid-cols-3 gap-5">
          <div className="col-span-3 lg:col-span-2">
            <div className="space-y-5 rounded-md bg-white p-5 py-10">
              <div className="">
                <h2>Select your payment system</h2>
              </div>
              <div>
                <SelectPaymentOption setPayWith={setPayWith} />
              </div>
              <div className={`${payWith === "" && "hidden"}`}>
                <h2 className="mt-10 mb-5 text-lg font-semibold text-my-gray-200">পেমেন্ট করার নিয়মঃ</h2>
                {/* {payWith === "bkash" && <BkashPaymentDetails />} */}
                {/* {payWith === "nogad" && <NagodPaymentDetails />} */}
                {/* {payWith === "rocket" && <RocketPaymentDetails />} */}
                {payWith === "stripe" && (
                  <ul className="space-y-3 text-base font-light text-my-gray-200">
                    <li>
                      <FcOk className="mr-3 inline" />
                      Stripe on the way
                    </li>
                  </ul>
                )}
                {payWith === "sslCommerz" && <SSLCommerzPaymentDetails />}
                {payWith === "cashOnDelivery" && (
                  <ul className="space-y-3 text-base font-light text-my-gray-200">
                    <li>
                      <FcOk className="mr-3 inline" />
                      Cash on Delivery on the way
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <div className="relative my-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <button
                onClick={() => router.push("/details")}
                className="w-full transform border border-primary py-2 text-base font-semibold text-primary transition duration-100 ease-in-out hover:bg-primary hover:text-white"
              >
                Back to Details
              </button>

              {payWith === "stripe" ? (
                <button
                  disabled={payWith === "" ? true : false}
                  className={` w-full bg-primary py-2 text-base font-semibold capitalize text-white disabled:cursor-not-allowed`}
                  onClick={() => setIsOpen(true)}
                >
                  Pay With {payWith}
                </button>
              ) : payWith === "sslCommerz" ? (
                <button
                  disabled={payWith === "" ? true : false}
                  className={` w-full bg-primary py-2 text-base font-semibold capitalize text-white disabled:cursor-not-allowed`}
                  onClick={handleSSLOrder}
                >
                  Pay With {payWith}
                </button>
              ) : payWith === "cashOnDelivery" ? (
                <button
                  className={` w-full bg-primary py-2 text-base font-semibold capitalize text-white disabled:cursor-not-allowed`}
                  onClick={handleOrder}
                >
                  Pay With {payWith}
                </button>
              ) : (
                <button
                  disabled
                  className={` w-full bg-primary py-2 text-base font-semibold capitalize text-white disabled:cursor-not-allowed`}
                >
                  Select payment options
                </button>
              )}
            </div>
          </div>

          <div className="col-span-3 lg:col-span-1">
            <OrderSummaryCart products={products} />
          </div>
        </div>
      </div>
      <Footer />

      {/* modal */}
      <StripePaymentModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default OrderProductPayment;
