import React from "react";
import Head from "next/head";
import PrivateRoute from "@/components/mainComponents/Auth/private/PrivateRoute";
import Success from "@/components/mainComponents/Payment/SSLCommerz/Success";

const payment = () => {
  return (
    <PrivateRoute>
      <Head>
        <title>Payment success</title>
      </Head>
      <Success />
    </PrivateRoute>
  );
};

export default payment;
