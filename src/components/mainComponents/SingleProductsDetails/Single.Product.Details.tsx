import { Button } from "@/components/ui/button";
import { addToCart, decreaseQuantity } from "@/redux/features/cart/cartSlice";
import { TProduct } from "@/types/common";
import { Dispatch, SetStateAction } from "react";
import {
  AiFillStar,
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { IoIosGitCompare } from "react-icons/io";
import { useDispatch } from "react-redux";

type Props = {
  product: TProduct;
};

const SingleProductDetails = ({ product }: Props) => {
  const dispatch = useDispatch();
  const discountedPrice = product.price - product.discount;

  return (
    <div className="space-y-8 p-4">
      {/* Product Header */}
      <div className="mb-6 space-y-4">
        <h1 className="text-3xl font-light text-gray-900">{product?.name}</h1>

        {/* Price Section */}
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-medium text-gray-900">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-2">
          <div className="flex text-amber-400">
            {[1, 2, 3, 4].map((i) => (
              <AiFillStar key={i} className="text-lg" />
            ))}
            <AiOutlineStar className="text-lg" />
          </div>
          <span className="text-sm text-gray-500">128 reviews</span>
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-4 border-b border-gray-100 pb-6">
        <h3 className="text-sm font-medium text-gray-700">DESCRIPTION</h3>
        <div className="space-y-3">
          <p className="leading-relaxed text-gray-600">
            {product.description ||
              "Premium quality product crafted with meticulous attention to detail. Designed for modern lifestyles with a focus on comfort and durability."}
          </p>
          <ul className="space-y-2 text-gray-600">
            {product.features?.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">COLOR</h3>
        <div className="flex gap-2">
          {product.colors.map((color, i) => (
            <button
              key={i}
              onClick={() => setFilterColor(color)}
              className={`h-8 w-8 rounded-full border-2 transition-all ${
                color === product.colors[0]
                  ? "border-gray-900"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">SIZE</h3>
        <div className="grid grid-cols-4 gap-2">
          {["S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              className={`py-2 text-sm transition-all ${
                size === "M"
                  ? "border-2 border-gray-900 bg-gray-50"
                  : "border border-gray-200 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">QUANTITY</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 border border-gray-200 px-4 py-2">
            <button
              onClick={() => dispatch(decreaseQuantity(product._id))}
              className="text-gray-500 transition-all hover:text-primary"
            >
              <AiOutlineMinus className="text-lg" />
            </button>
            <span className="w-8 text-center">1</span>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    name: product.name,
                    productId: product._id!,
                    vendorId: product.supplier._id,
                    imageUrl: product.images[0],
                    price: product.price,
                    quantity: 1,
                  }),
                )
              }
              className="text-gray-500 transition-all hover:text-primary"
            >
              <AiOutlinePlus className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Button className="w-full rounded-sm bg-gray-900 py-6 text-base hover:bg-gray-800">
          Add to Cart
        </Button>

        <div className="flex justify-center gap-4">
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <AiOutlineHeart className="text-lg" />
            Wishlist
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <IoIosGitCompare className="text-lg" />
            Compare
          </button>
        </div>
      </div>

      {/* Product Meta */}
      <div className="border-t border-gray-100 pt-6">
        <div className="space-y-2 text-sm">
          <div className="flex gap-2">
            <span className="text-gray-600">Category:</span>
            <span className="text-gray-900">{product.category}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-600">Vendor:</span>
            <span className="text-gray-900">
              {product?.supplier?.storeName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetails;
