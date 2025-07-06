import { VendorAccountSettings } from "@/components/mainComponents/Dashboard/vendor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Setting",
};

const VendorSettings = () => {
  return <VendorAccountSettings />;
};

export default VendorSettings;
