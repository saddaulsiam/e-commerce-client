"use client";

import { products } from "@/data/products";
import { AiFillThunderbolt, AiOutlineArrowRight } from "react-icons/ai";
import { Loading, ProductsCard } from "../../sharedComponents";

const RandomProducts = () => {
  const isLoading = false;
  // const [currentPage, setCurrentPage] = useState<number>(1);

  // //  pagination
  // const handlePageChange = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  // };
  return (
    <section className="relative bg-white py-10">
      <div className="container">
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
          <Loading />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {products.map((product, index) => (
                <ProductsCard product={product} key={index} />
              ))}
            </div>
            {/* {data?.data?.page > 1 && (
              <div className="mt-10 text-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={handlePageChange}
                />
              </div>
            )} */}
          </>
        )}
      </div>
    </section>
  );
};

export default RandomProducts;
