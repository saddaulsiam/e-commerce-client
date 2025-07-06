import { CreateNewAdmin } from "@/components/mainComponents/Dashboard/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Admin",
};
const CreateAdmin = () => {
  return <CreateNewAdmin />;
};

export default CreateAdmin;
