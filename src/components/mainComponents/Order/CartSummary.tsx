"use client";

import { Button } from "@/components/ui/button";
import { TCart } from "@/redux/features/cart/cartSlice";
import { usePathname, useRouter } from "next/navigation";

const CartSummary = ({ cart }: { cart: TCart }) => {
  const router = useRouter();
  const path = usePathname();
  const deliveryCharge = 150;
  return (
    <div className="space-y-3 rounded-md bg-white p-4">
      <h3 className="text-xl">Order Summary</h3>
      <div className="flex justify-between text-base text-slate-600">
        <p>Subtitle</p>
        <p> ৳ {cart.totalAmount.toFixed(2)}</p>
      </div>
      <div className="flex justify-between text-base text-slate-600">
        <p>Delivery Charge</p>
        <p>৳ {deliveryCharge}</p>
      </div>
      <hr />
      <div className="flex justify-between text-lg font-semibold">
        <p>Total</p>
        <p>৳ {deliveryCharge + Number(cart.totalAmount.toFixed(2))}</p>
      </div>
      {path === "/cart" && (
        <>
          <div className="w-full">
            <input
              type="text"
              className="h-10 w-4/5 border px-2 focus:outline-primary"
              placeholder="Enter Voucher Code"
            />
            <Button className="w-1/5 border bg-teal-500 px-2 py-2 text-white transition duration-100 ease-in-out hover:border-teal-500 hover:bg-white hover:text-teal-500">
              APPLY
            </Button>
          </div>
          <div>
            <Button onClick={() => router.push("/checkout")} className="w-full">
              PROCEED TO CHECKOUT
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;
