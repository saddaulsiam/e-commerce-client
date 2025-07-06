import { AdminNewVendorRequest } from "@/components/mainComponents/Dashboard/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Vendor Request",
};
const NewVendorRequest = () => {
  return <AdminNewVendorRequest />;
};

export default NewVendorRequest;
