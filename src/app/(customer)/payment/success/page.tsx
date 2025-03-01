import React from "react";
import Head from "next/head";
import PrivateRoute from "@/providers/PrivateRoute";
import PaymentSuccess from "@/components/mainComponents/Payment/PaymentSuccess";

const payment = () => {
  return (
    <PrivateRoute>
      <Head>
        <title>Payment success</title>
      </Head>
      <PaymentSuccess />
    </PrivateRoute>
  );
};

export default payment;
