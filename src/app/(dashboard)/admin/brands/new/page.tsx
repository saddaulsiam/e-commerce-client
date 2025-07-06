import { CreateBrand } from "@/components/mainComponents/Dashboard/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Brand",
};
const CreateNewBrand = () => {
  return <CreateBrand />;
};

export default CreateNewBrand;
