import { addToCart, removeFromCart, TCartItem } from "@/redux/features/cart/cartSlice";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";

const SideBarShoppingCartItem = ({ product }: { product: TCartItem }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="my-5 flex items-center justify-between px-4">
        <div className="flex space-x-5">
          <div className="flex flex-col items-center justify-center text-base">
            <span
              onClick={() => dispatch(removeFromCart(product._id))}
              className="cursor-pointer rounded-md border border-secondary p-1 text-secondary hover:bg-secondary hover:text-white"
            >
              <AiOutlineMinus />
            </span>
            <p className="my-1">{product.quantity}</p>

            <span
              className="cursor-pointer rounded-md border border-secondary p-1 text-secondary hover:bg-secondary hover:text-white"
              onClick={() => dispatch(addToCart(product))}
            >
              <AiOutlinePlus />
            </span>
          </div>
          <div className="">
            <Image height="80" width="70" className="h-20 w-20" src={product.imageUrl} alt="" priority />
          </div>
          <div className="">
            <p className="text-base font-semibold text-my-gray-200">{product.name.toString(0, 20) + "..."}</p>
            <p className="text-sm text-my-gray-100">
              ${product.price - product?.discount} x {product.quantity}
            </p>
            <p className="font-normal text-secondary">
              ${parseInt(product?.price - product?.discount) * parseInt(product?.quantity)}
            </p>
          </div>
        </div>
        <div>
          <button className="cursor-pointer" onClick={() => dispatch(removeFromCart(product._id))}>
            X
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default SideBarShoppingCartItem;
