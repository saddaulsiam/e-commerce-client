"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { addToCart } from "@/redux/features/cart/cartSlice";
import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "@/redux/features/products/productsApi";
import { useAppDispatch } from "@/redux/hooks";
import { TProduct } from "@/types/common";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  AiFillStar,
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { IoIosGitCompare } from "react-icons/io";
import { ProductsCard } from "../../sharedComponents";
import Breadcrumbs from "../../ui/breadcrumbs";
import SingleProductDescription from "./Single.Product.Description";
import SingleProductReview from "./Single.Product.Review";

const SingleProduct = () => {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description",
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { data: allProducts } = useGetAllProductsQuery({ limit: 5, page: 1 });
  const { data: singleProductData } = useGetSingleProductQuery(params?.id);

  const product: TProduct = singleProductData?.data;
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

  return (
    <div className="container py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: product?.category, href: `/category/${product?.category}` },
          { label: product?.name },
        ]}
        className="mb-6"
      />

      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        {/* Product Images Section */}
        <div className="space-y-4">
          {/* Main Image Container */}
          <div className="relative aspect-auto w-full overflow-hidden rounded-xl bg-gray-50">
            {product?.images?.length ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={800}
                height={800}
                className="block h-full w-full object-contain object-center"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-100 text-gray-500">
                No Image Available
              </div>
            )}
          </div>

          {/* Thumbnail Grid */}
          {product?.images?.length > 0 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative block overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image}
                    width={100}
                    height={100}
                    alt=""
                    className="block h-full w-full object-cover"
                    loading={index > 2 ? "lazy" : "eager"}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        {/* Product Details */}
        <div className="space-y-6">
          {/* Product Title & Actions */}
          <div className="mb-4 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold text-gray-900">
                {product?.name}
              </h1>
              <div className="flex items-center gap-2 text-xl text-gray-500">
                <Button variant="ghost" className="hover:text-red-500">
                  <AiOutlineHeart />
                </Button>
                <Button variant="ghost" className="hover:text-blue-600">
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
                  ${discountedPrice?.toFixed(2)}
                </span>
                {product?.discount > 0 && (
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
                {product?.sizes?.map((size) => (
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

          {/* Quantity Selection */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-700">Quantity</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 rounded-lg border border-gray-200 px-4 py-2">
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
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() =>
                dispatch(
                  addToCart({
                    name: product.name,
                    price: product.price,
                    productId: product._id!,
                    vendorId: product.supplier._id,
                    imageUrl: product.images[0],
                    quantity: 1,
                    // selectedSize,
                    // selectedColor,
                  }),
                )
              }
              className="w-full rounded-lg bg-primary py-6 text-base font-medium hover:bg-primary/90"
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-lg py-6 text-base font-medium"
            >
              Buy Now
            </Button>
          </div>

          {/* Product Meta (Category & Vendor) */}
          <div className="space-y-3 pt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium text-gray-900">
                {product?.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Vendor:</span>
              <span className="font-medium text-gray-900">
                {product?.supplier?.storeName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12">
        <nav className="border-b border-gray-200">
          <div className="-mb-px flex gap-4">
            {["description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "description" | "reviews")}
                className={cn(
                  "relative px-4 pb-4 text-lg font-medium transition-colors",
                  activeTab === tab
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                {tab === "reviews" ? (
                  <span className="flex items-center gap-2">
                    Reviews
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm text-primary">
                      {product?.reviews?.length || 0}
                    </span>
                  </span>
                ) : (
                  tab.charAt(0).toUpperCase() + tab.slice(1)
                )}
              </button>
            ))}
          </div>
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="py-8"
          >
            {activeTab === "description" ? (
              <SingleProductDescription product={product} />
            ) : (
              <div className="space-y-8">
                {/* Review Form */}
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-medium">Write a Review</h3>
                  <form className="space-y-4">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <AiFillStar
                          key={star}
                          className="h-6 w-6 cursor-pointer text-gray-300"
                        />
                      ))}
                    </div>
                    <textarea
                      placeholder="Share your thoughts..."
                      className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                    <Button className="rounded-lg">Submit Review</Button>
                  </form>
                </div>

                {product?.reviews?.map((review: any) => (
                  <SingleProductReview key={review._id} review={review} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Related Products */}
      <section className="my-16">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Related Products</h3>
          <Button variant="link" className="text-primary hover:text-primary/90">
            View All →
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {allProducts?.data?.data?.map((product: TProduct) => (
            <ProductsCard product={product} key={product._id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SingleProduct;
