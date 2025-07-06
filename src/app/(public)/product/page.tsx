import { SearchingProducts } from "@/components/mainComponents/SearchingProducts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};
const Searching = () => {
  return (
    <>
      <SearchingProducts />
    </>
  );
};

export default Searching;
