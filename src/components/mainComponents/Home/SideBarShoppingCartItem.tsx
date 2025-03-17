import { Button } from "@/components/ui/button";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  TCartItem,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const SideBarShoppingCartItem = ({ product }: { product: TCartItem }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-3 py-5">
      <div className="flex w-full items-center space-x-3">
        {/* Quantity controls */}
        <div className="flex flex-col items-center space-y-0.5 text-sm">
          <span
            onClick={() => dispatch(decreaseQuantity(product.productId))}
            className="cursor-pointer rounded-md border border-gray-300 p-1 text-gray-700 transition duration-200 ease-in-out hover:bg-gray-300 hover:text-primary"
          >
            <AiOutlineMinus />
          </span>
          <p className="font-medium text-gray-800">{product.quantity}</p>
          <span
            onClick={() =>
              dispatch(
                addToCart({
                  name: product.name,
                  productId: product.productId,
                  vendorId: product.vendorId,
                  image: product.image,
                  price: product.price,
                  quantity: 1,
                  color: product?.color,
                  size: product?.size,
                }),
              )
            }
            className="cursor-pointer rounded-md border border-gray-300 p-1 text-gray-700 transition duration-200 ease-in-out hover:bg-gray-300 hover:text-primary"
          >
            <AiOutlinePlus />
          </span>
        </div>

        {/* Product image */}
        <div className="flex-shrink-0">
          <Image
            height={80}
            width={80}
            className="rounded-md object-cover"
            src={product.image}
            alt={product.name}
            priority
          />
        </div>

        {/* Product details */}
        <div className="flex w-full flex-col justify-between">
          <p className="truncate text-sm font-semibold text-gray-900">
            {product.name}
          </p>
          <p className="text-xs text-gray-600">
            ${product.price} x {product.quantity}
          </p>
          <p className="text-base font-semibold text-primary">
            ${(product.price * product.quantity).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Remove button */}
      <Button
        variant="link"
        className="text-gray-600 transition-colors duration-200 ease-in-out hover:text-red-500"
        onClick={() => dispatch(removeFromCart(product.productId))}
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
};

export default SideBarShoppingCartItem;
