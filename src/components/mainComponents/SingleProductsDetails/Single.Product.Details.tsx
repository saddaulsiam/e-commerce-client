"use client";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { addToCompare } from "@/redux/features/compare/compareSlice";
import { addToWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TProduct } from "@/types/common";
import Link from "next/link";
import { useState } from "react";
import {
  AiFillStar,
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { IoIosGitCompare } from "react-icons/io";
import { toast } from "react-toastify";

type Props = {
  product: TProduct;
};

const SingleProductDetails = ({ product }: Props) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const discountedPrice = product?.price - product?.discount;
  const discountPercentage = Math.round(
    (product?.discount / product?.price) * 100,
  );

  const handleQuantityChange = (type: "increment" | "decrement") => {
    setQuantity((prev) =>
      Math.max(1, type === "increment" ? prev + 1 : prev - 1),
    );
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
    <div className="space-y-8">
      {/* Product Title & Actions */}
      <div className="mb-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-900">
            {product?.name}
          </h1>
          <div className="flex items-center text-xl text-gray-500">
            <Button
              onClick={handleAddToWishlist}
              variant="ghost"
              className="hover:text-red-500"
            >
              <AiOutlineHeart />
            </Button>
            <Button
              onClick={handleAddToCompare}
              variant="ghost"
              className="hover:text-blue-600"
            >
              <IoIosGitCompare />
            </Button>
          </div>
        </div>

        {/* Pricing & Discount */}
        <div className="flex flex-wrap items-baseline gap-3">
          {product?.discount > 0 && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              -{discountPercentage}% off
            </span>
          )}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              $
              {product?.discount ? discountedPrice?.toFixed(2) : product?.price}
            </span>
            {product?.discount && (
              <span className="text-sm text-gray-500 line-through">
                ${product?.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Rating & Availability */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber-400">
            {[1, 2, 3, 4].map((i) => (
              <AiFillStar key={i} className="h-5 w-5" />
            ))}
            <AiOutlineStar className="h-5 w-5" />
          </div>
          <span className="text-sm text-gray-500">(128 reviews)</span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm font-medium text-green-600">
            {product?.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Product Description */}
      <p className="text-lg leading-8">{product?.description}</p>

      {/* Color Selection */}
      {product?.colors?.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium text-gray-700">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color, i) => (
              <button
                key={i}
                onClick={() => setSelectedColor(color)}
                className={`h-10 w-10 rounded-full border-2 transition-all ${
                  selectedColor === color
                    ? "ring-2 ring-gray-900 ring-offset-2"
                    : "hover:ring-1 hover:ring-gray-300"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product?.sizes?.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium text-gray-700">Size</h3>
          <div className="grid grid-cols-4 gap-3">
            {["M", "L"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`rounded-md py-2 text-sm font-medium transition-all ${
                  selectedSize === size
                    ? "border-2 border-primary bg-primary/10 text-primary"
                    : "border border-gray-200 hover:border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity and Add to Cart Selection */}
      <div className="flex items-center gap-3">
        {/* Quantity Selector */}
        <div className="flex h-full items-center gap-4 rounded-lg border border-gray-200 px-4 py-2">
          <button
            onClick={() => handleQuantityChange("decrement")}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-primary"
          >
            <AiOutlineMinus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            onClick={() => handleQuantityChange("increment")}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-primary"
          >
            <AiOutlinePlus className="h-4 w-4" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={() => {
            dispatch(
              addToCart({
                name: product?.name,
                price: product?.price,
                productId: product?._id as string,
                vendorId: product?.supplier?._id,
                image: product?.images[0],
                quantity: quantity,
                color: selectedColor as string,
                size: selectedSize,
              }),
            );
            toast.success("Product added to cart");
          }}
          className="h-full w-full rounded-lg bg-primary text-base font-medium hover:bg-primary/90"
        >
          Add to Cart
        </Button>
        {/* Buy Button */}
        <Button
          variant="outline"
          className="w-full rounded-lg text-base font-medium"
        >
          Buy Now
        </Button>
      </div>

      {/* Product Meta (Category & Vendor) */}
      <div className="space-y-4 pt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Category:</span>
          <Link
            href={`/product?category=${product?.category}` || ""}
            className="font-medium capitalize text-gray-900 hover:text-primary hover:underline"
          >
            {product?.category.split("-")[2]}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Vendor:</span>
          <Link
            href={`/shop/${product?.supplier?.storeName}` || ""}
            className="font-medium text-gray-900 hover:text-primary hover:underline"
          >
            {product?.supplier?.storeName}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetails;
