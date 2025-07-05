import { VendorAllProducts } from "@/components/mainComponents/Dashboard/vendor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor All Products",
};

const AllProducts = () => {
  return <VendorAllProducts />;
};

export default AllProducts;
