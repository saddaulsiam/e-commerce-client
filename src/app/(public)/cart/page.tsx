import { ProductCart } from "@/components/mainComponents/Order";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};
const Cart = () => {
  return <ProductCart />;
};

export default Cart;
