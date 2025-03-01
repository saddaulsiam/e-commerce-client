"use client";

import StripePaymentModal from "@/components/sharedComponents/modal/StripePaymentModal";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { removeOrderDetails } from "@/redux/features/order/orderDetails/orderDetailsSlice";
import { useOrderNowMutation } from "@/redux/features/order/orders/ordersApi";
import { useCreateSSLPaymentIntentMutation } from "@/redux/features/order/payment/paymentApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcOk } from "react-icons/fc";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { SSLCommerzPaymentDetails } from "../Payment";
import {
  MainOrder,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "../../../types/Ordertype";
import CartSummary from "./CartSummary";
import ProgressSteps from "./ProgressSteps";
import SelectPaymentOption from "./SelectPaymentOption";
import { Button } from "@/components/ui/button";

const ProductPayment = () => {
  const router = useRouter();
  // const path = usePathname();
  const dispatch = useAppDispatch();

  const cart = useAppSelector(({ state }) => state.cart);
  const { user } = useAppSelector(({ state }) => state.auth);
  const { shippingAddress } = useAppSelector(({ state }) => state.orderDetails);

  const [openStripe, setOpenStripe] = useState<boolean>(false);
  const [payWith, setPayWith] = useState<string>("stripe");

  const [orderNow] = useOrderNowMutation();
  const [createSSLPaymentIntent] = useCreateSSLPaymentIntentMutation();

  const orderData: MainOrder = {
    userId: user?._id as string,
    totalAmount: cart.totalAmount,
    paymentMethod: payWith as PaymentMethod,
    isPaid: false,
    paymentStatus: PaymentStatus.UNPAID,
    shippingAddress: shippingAddress,
    status: OrderStatus.PROCESSING,
    subOrders: cart.cartItems,
  };

  // Handle Cash on delivery order
  const handleOrder = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Confirm this order",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#003566",
      cancelButtonColor: "#e63946",
      confirmButtonText: "Yes, confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        orderNow(orderData)
          .unwrap()
          .then((res) => {
            if (res.success) {
              toast.success(res.message);
              dispatch(clearCart());
              dispatch(removeOrderDetails());
              router.push("/customer/orders");
            }
          });
      }
    });
  };

  const handleSSLOrder = async () => {
    try {
      const res = await createSSLPaymentIntent(orderData).unwrap();
      if (res.success) {
        window.location.replace(res.data.gatewayPageURL);
        dispatch(clearCart());
        dispatch(removeOrderDetails());
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="bg-accent">
      <div className="container pb-20">
        <ProgressSteps />

        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-3 lg:col-span-2">
            <div className="space-y-5 rounded-md bg-white px-5 py-10">
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
              <Button
                variant="outline"
                onClick={() => router.push("/checkout")}
                className="w-full border-primary py-2 text-center text-base font-semibold text-primary transition duration-200 ease-in-out hover:bg-primary hover:text-white"
              >
                Back to Details
              </Button>
              <Button
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
              </Button>
            </div>
          </div>

          <div className="col-span-3 lg:col-span-1">
            <CartSummary cart={cart} />
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

export default ProductPayment;
