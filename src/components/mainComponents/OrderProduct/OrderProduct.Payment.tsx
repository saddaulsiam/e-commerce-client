"use client";

import StripePaymentModal from "@/components/sharedComponents/modal/Stripe.Payment.Modal";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { removeOrderDetails } from "@/redux/features/order/orderDetails/orderDetailsSlice";
import { useOrderNowMutation } from "@/redux/features/order/orders/ordersApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcOk } from "react-icons/fc";
import Swal from "sweetalert2";
import { SSLCommerzPaymentDetails } from "../Payment";
import {
  MainOrder,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "./OrderInterface";
import OrderSummaryCart from "./OrderSummaryCart";
import ProgressSteps from "./ProgressSteps";
import SelectPaymentOption from "./SelectPaymentOption";

const OrderProductPayment = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const cart = useAppSelector(({ state }) => state.cart);
  const { user } = useAppSelector(({ state }) => state.auth);
  const { shippingAddress } = useAppSelector(({ state }) => state.orderDetails);

  const [openStripe, setOpenStripe] = useState<boolean>(false);
  const [payWith, setPayWith] = useState<string>("stripe");

  const [orderNow] = useOrderNowMutation();

  const orderData: MainOrder = {
    userId: user?._id as string,
    totalAmount: cart.totalAmount,
    paymentMethod: payWith as PaymentMethod,
    isPaid: false,
    paymentStatus: PaymentStatus.UNPAID,
    shippingAddress: shippingAddress,
    status: OrderStatus.PENDING,
    subOrders: cart.cartItems,
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
        orderNow(orderData).then((res: any) => {
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
              router.push(res.isConfirmed ? "/customer/orders" : "/");
            });
          }
        });
      }
    });
  };

  const handleSSLOrder = async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/create-sslcommerz-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        window.location.replace(data.gatewayPageURL);
      })
      .finally(() => {
        dispatch(clearCart());
        dispatch(removeOrderDetails());
      });
  };

  return (
    <div className="bg-slate-200">
      <div className="container mt-32 lg:mt-[10.9rem]">
        <ProgressSteps />

        <div className="mb-10 grid grid-cols-3 gap-5">
          <div className="col-span-3 lg:col-span-2">
            <div className="space-y-5 rounded-md bg-white p-5 py-10">
              <h2>Select your payment system</h2>
              <SelectPaymentOption payWith={payWith} setPayWith={setPayWith} />
              {payWith && (
                <div>
                  <h2 className="mb-5 mt-10 text-lg font-semibold text-my-gray-200">
                    পেমেন্ট করার নিয়মঃ
                  </h2>
                  {payWith === "stripe" && (
                    <p>
                      <FcOk className="mr-3 inline" /> Stripe on the way
                    </p>
                  )}
                  {payWith === "sslCommerz" && <SSLCommerzPaymentDetails />}
                  {payWith === "cashOnDelivery" && (
                    <p>
                      <FcOk className="mr-3 inline" /> Cash on Delivery on the
                      way
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="relative my-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <button
                onClick={() => router.push("/checkout")}
                className="w-full border border-primary py-2 text-base font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                Back to Details
              </button>
              <button
                className="w-full bg-primary py-2 text-base font-semibold capitalize text-white disabled:cursor-not-allowed"
                disabled={!payWith}
                onClick={
                  payWith === "stripe"
                    ? () => setOpenStripe(true)
                    : payWith === "sslCommerz"
                      ? handleSSLOrder
                      : handleOrder
                }
              >
                Pay With {payWith || "Select payment option"}
              </button>
            </div>
          </div>

          <div className="col-span-3 lg:col-span-1">
            <OrderSummaryCart cart={cart} />
          </div>
        </div>
      </div>

      <StripePaymentModal
        openStripe={openStripe}
        setOpenStripe={setOpenStripe}
      />
    </div>
  );
};

export default OrderProductPayment;
