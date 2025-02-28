"use client";

import RatingStars from "@/components/ui/rating";
import { TProduct } from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { GrCompare } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import ProductsModal from "../modal/Products.Modal";

const ProductsCard = ({ product }: { product: TProduct }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // Handle Add to Cart
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        vendorId: product.vendorId,
        imageUrl: product.images[0],
        name: product.name,
        price: product.price,
        quantity: 1,
      }),
    );

    toast.success("Added to cart");
    setIsOpen(false);
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
            className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          {/* Floating Icons */}
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform space-x-3 text-lg text-gray-700 group-hover:flex">
            <button
              className="rounded-full bg-white p-2 transition duration-300 hover:bg-primary hover:text-white"
              onClick={() => setIsOpen(true)}
            >
              <AiFillEye />
            </button>
            <button className="rounded-full bg-white p-2 transition duration-300 hover:bg-primary hover:text-white">
              <GrCompare />
            </button>
            <button
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
        <div className="p-4">
          <Link href={`/product/${product._id}`}>
            <h3 className="text-lg font-semibold capitalize text-gray-800 transition duration-200 hover:text-primary">
              {product?.name?.slice(0, 25)}
              {product?.name?.length > 20 && "..."}
            </h3>
          </Link>

          {/* Rating Section */}
          <RatingStars rating={product.rating} />

          {/* Price Section */}
          <div className="mt-2 flex items-center space-x-2 text-lg font-semibold">
            <span className="text-primary">
              ${(product.price * 0.9).toFixed(2)}
            </span>
            <span className="text-gray-400 line-through">${product.price}</span>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex">
          {/* Add to Cart Button */}
          <button
            className="flex w-1/2 items-center justify-center gap-2 rounded-bl-lg bg-slate-200 px-4 py-3 font-semibold text-my-gray-200 transition-all duration-300 ease-in hover:bg-slate-300 active:scale-95"
            onClick={handleAddToCart}
          >
            <BsCart2 className="text-lg" /> Add to Cart
          </button>

          {/* Buy Now Button */}
          <button
            className="flex w-1/2 items-center justify-center gap-2 rounded-br-lg bg-primary px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-orange-600 active:scale-95"
            onClick={() => {
              handleAddToCart();
              router.push("/checkout");
            }}
          >
            ⚡ Buy Now
          </button>
        </div>

        {/* Discount Badge */}
        {product.price > 0 && (
          <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
            {`${(((product.price - product.price * 0.9) / product.price) * 100).toFixed(0)}% Off`}
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
