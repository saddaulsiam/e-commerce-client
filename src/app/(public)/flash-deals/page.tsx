"use client";
import { ProductsCard } from "@/components/sharedComponents";
import { ProductsSkeleton } from "@/components/sharedComponents/loader";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/common";
import { AiFillThunderbolt } from "react-icons/ai";

const FlashDeals = () => {
  const query = {
    page: 1,
    limit: 10,
    // sortBy: "createdAt",
    // sortOrder: "asc",
  };

  const { data, isLoading } = useGetAllProductsQuery(query);

  const products = data?.data?.data;
  return (
    <div className="container px-2 py-6">
      <h2 className="pb-5 text-2xl font-bold italic text-primary">
        <AiFillThunderbolt className="inline" />
        FlashDeals
      </h2>
      {isLoading ? (
          <ProductsSkeleton />
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-4 lg:grid-cols-5">
          {products.map((product: TProduct) => (
            <ProductsCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FlashDeals;
