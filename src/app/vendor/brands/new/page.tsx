import Head from "next/head";

// local
import VendorDashboardLayout from "../../../components/mainComponents/Dashboard/vendor/Vendor.Dashboard.Layout";
import { VendorCreateBrand } from "../../../components/mainComponents/Dashboard/vendor";

const createBrand = () => {
  return (
    <>
      <Head>
        <title>Create Brand</title>
      </Head>
      <VendorDashboardLayout>
        <VendorCreateBrand />
      </VendorDashboardLayout>
    </>
  );
};

export default createBrand;
