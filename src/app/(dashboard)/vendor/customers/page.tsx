import { VendorAllCustomers } from "@/components/mainComponents/Dashboard/vendor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Customers",
};

const VendorCustomers = () => {
  return <VendorAllCustomers />;
};

export default VendorCustomers;
