"use client";

import { SwiperProductsCard } from "@/components/sharedComponents";
import { ProductsSkeleton } from "@/components/sharedComponents/loader";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import Link from "next/link";
import { AiFillThunderbolt, AiOutlineArrowRight } from "react-icons/ai";

const FlashDeals = () => {
  const { data: products, isLoading } = useGetAllProductsQuery({
    limit: 15,
    page: 1,
    status: "in-stock",
  });

  return (
    <section className="bg-white">
      <div className="container px-2 pb-16 pt-10">
        <div className="flex justify-between">
          <h2 className="pb-5 text-2xl font-bold italic text-primary">
            <AiFillThunderbolt className="inline" />
            Flash Deals
          </h2>
          <Link href="/flash-deals" className="text-sm text-my-gray-100">
            View all <AiOutlineArrowRight className="inline" />
          </Link>
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
