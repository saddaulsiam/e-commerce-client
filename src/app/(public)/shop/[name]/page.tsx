import { VendorShopMain } from "@/components/mainComponents/VendorShop";
import { Metadata } from "next";

type Props = {
  params: { name: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: decodeURIComponent(params.name),
  };
}

const Name = () => {
  return <VendorShopMain />;
};

export default Name;
