import { AllAdmins } from "@/components/mainComponents/Dashboard/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admins",
};

const AllAdmin = () => {
  return <AllAdmins />;
};

export default AllAdmin;
