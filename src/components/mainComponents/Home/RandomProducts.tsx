"use client";

import { ProductsSkeleton } from "@/components/sharedComponents/loader";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/common";
import { useState } from "react";
import { AiFillThunderbolt, AiOutlineArrowRight } from "react-icons/ai";
import { Pagination, ProductsCard } from "../../sharedComponents";

const RandomProducts = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: products, isLoading } = useGetAllProductsQuery({
    limit: 15,
    page: currentPage,
    status: "in-stock",
  });

  // pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <section className="relative bg-white">
      <div className="container px-2 py-16">
        <div className="flex justify-between">
          <h2 className="pb-5 text-2xl font-bold italic text-primary">
            <AiFillThunderbolt className="mr-1 inline text-primary" />
            More For You
          </h2>
          <a href="" className="text-sm text-my-gray-100">
            View all <AiOutlineArrowRight className="inline" />
          </a>
        </div>
        {isLoading ? (
          <ProductsSkeleton />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {products?.data?.data?.map((product: TProduct) => (
                <ProductsCard product={product} key={product._id} />
              ))}
            </div>
            {products?.data?.meta?.total >= 15 && (
              <div className="mt-10 text-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={products?.data?.meta?.page}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default RandomProducts;
