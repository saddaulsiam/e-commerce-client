"use client";

import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { AiFillThunderbolt, AiOutlineArrowRight } from "react-icons/ai";
import { ProductsSkeleton, SwiperProductsCard } from "../../sharedComponents";

const FlashDeals = () => {
  const { data: products, isLoading } = useGetAllProductsQuery({
    limit: 15,
    page: 1,
  });

  return (
    <section className="bg-white">
      <div className="container px-2 pb-16 pt-10">
        <div className="flex justify-between">
          <h2 className="pb-5 text-2xl font-bold italic text-primary">
            <AiFillThunderbolt className="inline" />Flash Deals
          </h2>
          <a href="" className="text-sm text-my-gray-100">
            View all <AiOutlineArrowRight className="inline" />
          </a>
        </div>

        {isLoading ? (
          <ProductsSkeleton />
        ) : (
          <SwiperProductsCard products={products?.data?.data} />
        )}
      </div>
    </section>
  );
};

export default FlashDeals;
