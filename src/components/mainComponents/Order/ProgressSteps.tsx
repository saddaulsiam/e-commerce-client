"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

const steps = ["Cart", "Checkout", "Payment"];

const ProgressSteps = () => {
  const path = usePathname();
  const { cartItems } = useAppSelector(({ state }) => state.cart);
  const { shippingAddress } = useAppSelector(({ state }) => state.orderDetails);

  const currentStep = steps.findIndex(
    (step) => path.toLowerCase() === `/${step.toLowerCase()}`,
  );

  const isStepActive = (stepIndex: number) => currentStep >= stepIndex;
  const isConnectionActive = (stepIndex: number) => currentStep > stepIndex;

  return (
    <nav className="flex items-center py-6 sm:py-10">
      {/* Cart Step */}
      <div className="flex items-center">
        <Button
          className={cn(
            "cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all sm:px-6 sm:py-2 sm:text-sm",
            {
              "bg-primary text-white": isStepActive(0),
              "bg-slate-200 text-slate-600 hover:text-white": !isStepActive(0),
            },
          )}
        >
          <Link href="/cart">
            <span>1. Cart</span>
          </Link>
        </Button>
        <div
          className={cn("w-12 border-t-4 transition-all sm:w-20", {
            "border-primary": isConnectionActive(0),
            "border-gray-300": !isConnectionActive(0),
          })}
        />
      </div>

      {/* Checkout Step */}
      <div className="flex items-center">
        <Button
          disabled={cartItems.length === 0}
          className={cn(
            "cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all sm:px-6 sm:py-2 sm:text-sm",
            {
              "bg-primary text-white": isStepActive(1),
              "bg-slate-200 text-slate-600 hover:text-white": !isStepActive(1),
            },
          )}
        >
          {cartItems.length > 0 ? (
            <Link href="/checkout">
              <span>2. Checkout</span>
            </Link>
          ) : (
            <span>2. Checkout</span>
          )}
        </Button>
        <div
          className={cn("w-12 border-t-4 transition-all sm:w-20", {
            "border-primary": isConnectionActive(1),
            "border-gray-300": !isConnectionActive(1),
          })}
        />
      </div>

      {/* Payment Step */}
      <div className="flex items-center">
        <Button
          disabled={cartItems.length === 0 || !shippingAddress}
          className={cn(
            "cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all sm:px-6 sm:py-2 sm:text-sm",
            {
              "bg-primary text-white": isStepActive(2),
              "bg-slate-200 text-slate-600 hover:text-white": !isStepActive(2),
            },
          )}
        >
          {cartItems.length > 0 && shippingAddress ? (
            <Link href="/payment">
              <span>3. Payment</span>
            </Link>
          ) : (
            <span>3. Payment</span>
          )}
        </Button>
      </div>
    </nav>
  );
};

export default ProgressSteps;
