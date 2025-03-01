"use client";

import { TCart } from "@/redux/features/cart/cartSlice";
import { usePathname, useRouter } from "next/navigation";

const CartSummary = ({ cart }: { cart: TCart }) => {
  const router = useRouter();
  const path = usePathname();
  const deliveryCharge = 150;

  return (
    <div className="space-y-3 rounded-md bg-white p-4">
      <h3 className="text-xl">Order Summary</h3>
      <div className="flex justify-between text-base">
        <p className="text-my-gray-100">Subtitle</p>
        <p className="text-black"> ৳ {cart.totalAmount.toFixed(2)}</p>
      </div>
      <div className="flex justify-between text-base">
        <p className="text-my-gray-100">Delivery Charge</p>
        <p className="text-black">৳ {deliveryCharge}</p>
      </div>
      <hr />
      <div className="flex justify-between text-base">
        <p className="text-base font-semibold text-my-gray-100">Total</p>
        <p className="font-semibold text-primary">
          ৳ {deliveryCharge + Number(cart.totalAmount.toFixed(2))}
        </p>
      </div>
      {path === "/cart" && (
        <>
          <div className="w-full">
            <input
              type="text"
              className="h-10 w-4/5 border px-2 focus:outline-primary"
              placeholder="Enter Voucher Code"
            />
            <button className="w-1/5 border bg-teal-500 px-2 py-2 text-white transition duration-100 ease-in-out hover:border-teal-500 hover:bg-white hover:text-teal-500">
              APPLY
            </button>
          </div>
          <div>
            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-primary py-2 text-sm text-white transition duration-100 ease-in-out hover:bg-red-600"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;
