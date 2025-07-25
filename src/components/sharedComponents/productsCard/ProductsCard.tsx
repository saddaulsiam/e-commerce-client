"use client";

import RatingStars from "@/components/ui/rating";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { addToCompare } from "@/redux/features/compare/compareSlice";
import { addToWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { TProduct } from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillEye, AiOutlineHeart } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { IoIosGitCompare } from "react-icons/io";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ProductsModal from "../modal/ProductsModal";

const ProductsCard = ({ product }: { product: TProduct }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // Handle Add to Cart
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product?._id as string,
        vendorId: product?.supplier?._id,
        image: product?.images[0],
        name: product?.name,
        price: product?.price,
        quantity: 1,
        color: product?.colors[0].label,
        size: "L",
      }),
    );

    toast.success("Added to cart");
    setIsOpen(false);
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
    toast.success("Added to wishlist");
  };

  const handleAddToCompare = () => {
    dispatch(addToCompare(product));
    toast.success("Added to Compare List");
  };

  return (
    <>
      <div className="relative rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
        {/* Product Image Section */}
        <div className="group relative w-full overflow-hidden rounded-t-lg bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={250}
            className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-52"
            priority
          />
          {/* Floating Icons */}
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform space-x-3 text-lg text-gray-700 group-hover:flex">
            <button
              title="Quick view"
              className="rounded-full bg-white p-2 transition duration-300 hover:bg-primary hover:text-white"
              onClick={() => setIsOpen(true)}
            >
              <AiFillEye />
            </button>
            <button
              title="Add to wishlist"
              className="rounded-full bg-white p-2 transition duration-300 hover:bg-primary hover:text-white"
            >
              <AiOutlineHeart onClick={handleAddToWishlist} />
            </button>
            <button
              title="Add to compare list"
              className="rounded-full bg-white p-2 transition duration-300 hover:bg-primary hover:text-white"
            >
              <IoIosGitCompare onClick={handleAddToCompare} />
            </button>
            <button
              title="Add to cart"
              className="rounded-full bg-white p-2 transition duration-300 hover:bg-primary hover:text-white"
              onClick={() => {
                handleAddToCart();
                router.push("/cart");
              }}
            >
              <BsCart2 />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-1.5 md:p-4">
          <Link href={`/product/${product._id}`}>
            <h3 className="truncate text-lg font-semibold capitalize text-gray-800 transition duration-200 hover:text-primary">
              {product?.name}
            </h3>
          </Link>

          {/* Rating Section */}
          <RatingStars rating={product?.rating as number} />

          {/* Price Section */}
          <div className="mt-2 flex items-center text-lg font-semibold text-primary">
            <span className="mr-0.5 text-2xl">৳</span>
            <span>{(product.price - product.discount).toFixed(0)}</span>
            <span className="ml-1 text-sm text-gray-400 line-through">
              {product.price}
            </span>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex">
          {/* Add to Cart Button */}
          <button
            className="flex w-1/2 items-center justify-center gap-1 rounded-bl-lg bg-slate-200 py-1.5 font-semibold text-my-gray-200 transition-all duration-300 ease-in hover:bg-slate-300 active:scale-95 md:py-3"
            onClick={handleAddToCart}
          >
            <BsCart2 className="pr-1 text-lg" />
            Add
            <span className="hidden xl:block"> to Cart</span>
          </button>

          {/* Buy Now Button */}
          <button
            className="flex w-1/2 items-center justify-center gap-1 rounded-br-lg bg-primary py-1.5 font-semibold text-white transition-all duration-300 hover:bg-orange-600 active:scale-95 md:py-3"
            onClick={() => {
              handleAddToCart();
              router.push("/checkout");
            }}
          >
            ⚡ Buy
            <div className="hidden xl:block">Now</div>
          </button>
        </div>

        {/* Discount Badge */}
        {product.price > 0 && (
          <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
            {`${((product.discount / product.price) * 100).toFixed(0)}% Off`}
          </div>
        )}

        {/* Out of Stock Label */}
        {product.stock === 0 && (
          <div className="absolute right-2 top-2 rounded-full bg-gray-500 px-2 py-0.5 text-xs font-medium text-white">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductsModal isOpen={isOpen} setIsOpen={setIsOpen} product={product} />
    </>
  );
};

export default ProductsCard;
