"use client";

import { useState } from "react";
import { AiFillThunderbolt, AiOutlineArrowRight } from "react-icons/ai";
import { Loading, Pagination, ProductsCard } from "../../sharedComponents";
import { useGetProductsQuery } from "../../../redux/features/products/productsApi";

const RandomProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetProductsQuery({
    limit: 20,
    page: currentPage,
    sort: "",
  });

  //  pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <section className="relative bg-[#e6ebf1] px-3 pb-16 xl:px-0">
      <div className="container">
        <div className="flex justify-between">
          <h2 className="pb-5 text-2xl font-bold italic text-primary">
            <AiFillThunderbolt className="mr-1 inline text-secondary" />
            More For You
          </h2>
          <a href="" className="text-sm text-my-gray-100">
            View all <AiOutlineArrowRight className="inline" />
          </a>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 rounded-md sm:grid-cols-3 lg:grid-cols-5">
              {data?.data?.products.map((product, index) => (
                <ProductsCard product={product} key={index} />
              ))}
            </div>
            {data?.data?.page > 1 && (
              <div className="mt-10 text-center">
                <Pagination currentPage={currentPage} totalPages={data?.data?.page} onPageChange={handlePageChange} />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default RandomProducts;
