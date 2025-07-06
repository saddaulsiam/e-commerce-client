"use client";

import {
  ProductsCard,
  SwiperProductsCard,
} from "@/components/sharedComponents";
import { ProductsSkeleton } from "@/components/sharedComponents/loader";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/common";
import { AiFillThunderbolt } from "react-icons/ai";

const VendorShopHomePage = () => {
  const { data: products, isLoading } = useGetAllProductsQuery({
    status: "in-stock",
  });

  return (
    <>
      {/* Best sealing products */}
      <div className="mt-10 px-2">
        <h2 className="pb-5 text-2xl font-bold italic text-primary">
          <AiFillThunderbolt className="inline text-primary" /> Best Sealing
          Products
        </h2>

        {isLoading ? (
          <ProductsSkeleton />
        ) : (
          <SwiperProductsCard products={products?.data?.data} />
        )}
      </div>

      {/* Just for you products */}

      <div className="my-20 px-2">
        <h2 className="pb-5 text-2xl font-bold italic text-primary">
          <AiFillThunderbolt className="inline text-primary" /> Just For You
        </h2>
        {isLoading ? (
          <ProductsSkeleton />
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 rounded-md sm:grid-cols-3 lg:grid-cols-5">
            {products?.data?.data?.map((product: TProduct) => (
              <ProductsCard product={product} key={product._id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default VendorShopHomePage;
