import Wishlists from "@/components/mainComponents/Wishlist/Wishlists";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist",
};
const Wishlist = () => {
  return <Wishlists />;
};

export default Wishlist;
