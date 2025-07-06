import { AdminAllProducts } from "@/components/mainComponents/Dashboard/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products List",
};
const AllProducts = () => {
  return <AdminAllProducts />;
};

export default AllProducts;
