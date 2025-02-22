import Head from "next/head";
import VendorProductAddForm from "./Vendor.Product.AddForm";

const VendorAddProduct = () => {
  return (
    <>
      <Head>
        <title>Add New Product</title>
      </Head>
      <div className="mx-auto max-w-4xl">
        <div>
          <h2 className="my-5 text-2xl font-semibold text-my-gray-200">
            Add New Product
          </h2>
        </div>
        <VendorProductAddForm />
      </div>
    </>
  );
};

export default VendorAddProduct;
