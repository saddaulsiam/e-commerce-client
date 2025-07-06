import { AdminAllVendors } from "@/components/mainComponents/Dashboard/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendors List",
};
const AllVendors = () => {
  return <AdminAllVendors />;
};

export default AllVendors;
