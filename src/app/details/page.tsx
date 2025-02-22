import React from "react";
import Head from "next/head";
import PrivateRoute from "@/components/mainComponents/Auth/private/PrivateRoute";
import { OrderProductDetails } from "@/components/mainComponents/OrderProduct";

const details = () => {
  return (
    <div>
      <Head>
        <title>Order Details</title>
      </Head>
      <PrivateRoute>
        <OrderProductDetails />
      </PrivateRoute>
    </div>
  );
};

export default details;
