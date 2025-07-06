import { AdminCreateCategory } from "@/components/mainComponents/Dashboard/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Category",
};
const CreateNewCategory = () => {
  return <AdminCreateCategory />;
};

export default CreateNewCategory;
