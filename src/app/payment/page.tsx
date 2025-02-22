import React from "react";
import { OrderProductPayment } from "../../components/mainComponents/OrderProduct";
import Head from "next/head";
import PrivateRoute from "../../components/mainComponents/Auth/private/PrivateRoute";

const payment = () => {
  return (
    <>
      <Head>
        <title>Payment</title>
      </Head>
      <PrivateRoute>
        <OrderProductPayment />
      </PrivateRoute>
    </>
  );
};

export default payment;
