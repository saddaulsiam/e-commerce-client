import { AdminDashboardLayout } from "@/components/mainComponents/Dashboard/Admin";
import { VendorCreateBrand } from "@/components/mainComponents/Dashboard/vendor";
import Head from "next/head";


const createBrand = () => {
  return (
    <>
      <Head>
        <title>Create Brand</title>
      </Head>
      <AdminDashboardLayout>
        <VendorCreateBrand />
      </AdminDashboardLayout>
    </>
  );
};

export default createBrand;
