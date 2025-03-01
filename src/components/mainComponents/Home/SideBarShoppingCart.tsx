"use client";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { AiOutlineShopping } from "react-icons/ai";
import SideBarShoppingCartItem from "./SideBarShoppingCartItem";

const SideBarShoppingCart = () => {
  const router = useRouter();
  const { cartItems } = useAppSelector(({ state }) => state.cart);

  return (
    <SheetContent
      side="right"
      className="flex h-full flex-col rounded-lg bg-white p-0 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 border-b border-gray-200 bg-gray-50 px-5 py-6 text-xl font-semibold text-gray-800">
        <AiOutlineShopping className="text-2xl text-gray-600" />
        <SheetTitle className="text-lg">{cartItems.length} items</SheetTitle>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto">
        {cartItems.length > 0 ? (
          cartItems.map((product, i) => (
            <SideBarShoppingCartItem product={product} key={i} />
          ))
        ) : (
          <p className="mt-10 text-center text-gray-500">Your cart is empty</p>
        )}
      </div>

      {/* Buttons */}
      <div className="space-y-4 px-4 py-6">
        <Button
          className="w-full transform bg-primary text-white transition duration-200 ease-in-out hover:bg-orange-600"
          onClick={() => router.push("/checkout")}
        >
          Checkout Now
        </Button>
        <Button
          variant="outline"
          className="w-full border-primary text-primary transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white"
          onClick={() => router.push("/cart")}
        >
          View Cart
        </Button>
      </div>
    </SheetContent>
  );
};

export default SideBarShoppingCart;
