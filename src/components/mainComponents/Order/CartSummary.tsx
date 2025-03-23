"use client";

import { Button } from "@/components/ui/button";
import { TCart } from "@/redux/features/cart/cartSlice";
import { usePathname, useRouter } from "next/navigation";

const CartSummary = ({ cart }: { cart: TCart }) => {
  const router = useRouter();
  const path = usePathname();
  const deliveryCharge = 150;
  const subtotal = Number(cart.totalAmount.toFixed(2));
  const total = deliveryCharge + subtotal;

  return (
    <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
      <h3 className="border-b pb-2 text-2xl font-bold text-gray-800">
        Order Summary
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between text-base text-gray-600">
          <p>Subtotal</p>
          <p>৳ {subtotal}</p>
        </div>
        <div className="flex justify-between text-base text-gray-600">
          <p>Delivery Charge</p>
          <p>৳ {deliveryCharge}</p>
        </div>
        <hr className="border-gray-300" />
        <div className="flex justify-between text-lg font-semibold text-gray-800">
          <p>Total</p>
          <p>৳ {total}</p>
        </div>
      </div>
      {path === "/cart" && (
        <Button
          onClick={() => router.push("/checkout")}
          className="h-12 w-full rounded bg-primary font-semibold text-white transition-colors duration-150 hover:bg-primary/90"
        >
          PROCEED TO CHECKOUT
        </Button>
      )}
    </div>
  );
};

export default CartSummary;
