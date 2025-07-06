import { AdminCategories } from "@/components/mainComponents/Dashboard/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories List",
};
const AllCategories = () => {
  return <AdminCategories />;
};

export default AllCategories;
