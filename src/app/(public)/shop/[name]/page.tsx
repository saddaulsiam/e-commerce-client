import { VendorShopMain } from "@/components/mainComponents/VendorShop";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  return {
    title: decodeURIComponent(params.name),
  };
}

const Name = () => {
  return <VendorShopMain />;
};

export default Name;
