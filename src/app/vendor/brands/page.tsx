import React from "react";
import { VendorDashboardLayout } from "../../../components/mainComponents/Dashboard/vendor";
import Head from "next/head";

const index = () => {
  return (
    <>
      <Head>
        <title>Create Brand</title>
      </Head>
      <VendorDashboardLayout>All Brands</VendorDashboardLayout>
    </>
  );
};

export default index;
