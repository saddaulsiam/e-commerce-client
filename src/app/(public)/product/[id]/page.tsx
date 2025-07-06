import { SingleProduct } from "@/components/mainComponents/SingleProductsDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details",
};
const SingleProductPage = () => {
  return <SingleProduct />;
};

export default SingleProductPage;
