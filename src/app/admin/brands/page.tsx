import Head from "next/head";
import { AdminDashboardLayout } from "../../../components/mainComponents/Dashboard/Admin";

const AllBrands = () => {
  return (
    <>
      <Head>
        <title>Create Brand</title>
      </Head>
      <AdminDashboardLayout>All Brands</AdminDashboardLayout>
    </>
  );
};

export default AllBrands;
