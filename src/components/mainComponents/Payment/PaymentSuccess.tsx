import Link from "next/link";
import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h3 className="text-4xl font-bold text-secondary">YO YO YO </h3>
      <p className="mt-3 text-2xl font-medium text-primary">
        Payment successfully completed
      </p>
      <Link href="/customer/orders" className="button mt-10">
        My Orders
      </Link>
    </div>
  );
};

export default PaymentSuccess;
