import React from "react";
import Head from "next/head";
import Success from "../../../components/mainComponents/Payment/SSLCommerz/Success";
import PrivateRoute from "../../../components/mainComponents/Auth/private/PrivateRoute";

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
