import React from "react";
import Head from "next/head";
import Fail from "../../../components/mainComponents/Payment/SSLCommerz/Fail";
import PrivateRoute from "../../../components/mainComponents/Auth/private/PrivateRoute";

const payment = () => {
  return (
    <PrivateRoute>
      <Head>
        <title>Payment failed</title>
      </Head>
      <Fail />
    </PrivateRoute>
  );
};

export default payment;
