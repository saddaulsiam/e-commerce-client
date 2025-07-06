import { VendorOrderDetails } from "@/components/mainComponents/Dashboard/vendor";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Order Details",
};

const OrderDetails = () => {
  return <VendorOrderDetails />;
};

export default OrderDetails;
