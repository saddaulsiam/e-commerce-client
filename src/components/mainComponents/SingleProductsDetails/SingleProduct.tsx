"use client";

import { RelatedProducts } from "@/components/sharedComponents";
import { cn } from "@/lib/utils";
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { TProduct, TReview } from "@/types/common";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";
import Breadcrumbs from "../../ui/breadcrumbs";
import SingleProductDescription from "./Single.Product.Description";
import SingleProductDetails from "./Single.Product.Details";
import SingleProductImages from "./Single.Product.Images";
import SingleProductReviewForm from "./Single.Product.ReviewForm";
import SingleProductReview from "./Single.Product.Reviews";

const SingleProduct = () => {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description",
  );

  const { data: singleProductData } = useGetSingleProductQuery(params?.id);
  const product: TProduct = singleProductData?.data;

  return (
    <div className="container py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          {
            label: product?.category,
            href: `/product?category=${product?.category}`,
          },
          { label: product?.name },
        ]}
        className="mb-6"
      />

      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        {/* Product Images Section */}
        <SingleProductImages product={product} />

        {/* Product Details */}
        <SingleProductDetails product={product} />
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
                <SingleProductReviewForm product={product} />

                {product?.reviews?.map((review: TReview) => (
                  <SingleProductReview key={review._id} review={review} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Related Products */}
      <RelatedProducts category={product?.category} />
    </div>
  );
};

export default SingleProduct;
