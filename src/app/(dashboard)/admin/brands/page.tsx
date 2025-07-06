import { AllBrandsList } from "@/components/mainComponents/Dashboard/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brands List",
};
const AllBrands = () => {
  return <AllBrandsList />;
};

export default AllBrands;
