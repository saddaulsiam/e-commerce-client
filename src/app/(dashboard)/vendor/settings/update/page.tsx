import { VendorUpdateAccountSettings } from "@/components/mainComponents/Dashboard/vendor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Edit Product",
};

const UpdateSettings = () => {
  return <VendorUpdateAccountSettings />;
};

export default UpdateSettings;
