import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const PaymentFail = () => {
  return (
    <div className="flex min-h-[calc(100vh-20vh)] w-full flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center">
          <div className="text-6xl text-red-500">⚠️</div>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Payment Unsuccessful
        </h1>

        <div className="mb-8 space-y-2 text-gray-600">
          <p className="text-lg">We couldn&apos;t process your payment</p>
          <p className="text-sm">
            Please check your payment information and try again
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="/cart">
            <Button className="w-full"> Try Again</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Back To Home
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? Contact our support team:</p>
          <a
            href="mailto:support@example.com"
            className="text-blue-600 hover:underline"
          >
            support@example.com
          </a>
          <p className="mt-2">(Mon-Sun, 9 AM - 8 PM)</p>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Your card was not charged. If money was deducted, it will be refunded
          within 3-5 business days.
        </p>
      </div>
    </div>
  );
};

export default PaymentFail;
