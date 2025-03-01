import Link from "next/link";
import React from "react";

const PaymentCancel = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h3 className="text-4xl font-bold text-secondary">Opss</h3>
      <p className="mt-3 text-2xl font-medium text-primary">
        Something went wrong! please try again
      </p>
      <Link href="/cart" className="button mt-10">
        My Cart
      </Link>
    </div>
  );
};

export default PaymentCancel;
