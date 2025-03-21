"use client";
import Lottie from "lottie-react";
import Link from "next/link";
import success from "@/../public/animation/success.json";
import { Button } from "@/components/ui/button";

const PaymentSuccess = () => {
  return (
    <div className="flex min-h-[calc(100vh-20vh)] w-full flex-col items-center justify-center bg-accent p-4">
      <div className="max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto -mt-10 mb-6 flex h-32 w-32 items-center justify-center">
          <Lottie animationData={success} loop={true} className="scale-150" />
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Payment Successful!
        </h1>

        <div className="mb-8 space-y-2 text-gray-600">
          <p className="text-lg">Thank you for your purchase! 🎉</p>
          <p className="text-sm">Estimated delivery: 3-5 business days</p>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="/orders">
            <Button className="w-full">View Order Details</Button>
          </Link>

          <Link href="/">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          A confirmation email has been sent to your registered address
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
