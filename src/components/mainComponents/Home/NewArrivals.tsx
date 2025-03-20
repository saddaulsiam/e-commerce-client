"use client";

import { ProductsSkeleton } from "@/components/sharedComponents";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdFiberNew } from "react-icons/md";

const NewArrivals = () => {
  const { data: products, isLoading } = useGetAllProductsQuery({});

  return (
    <section className="container px-2 pb-16 pt-10">
      <div className="flex items-center justify-between">
        <h2 className="pb-5 text-2xl font-bold italic text-primary">
          <MdFiberNew className="mr-1 inline text-primary" />
          New Arrivals
        </h2>
        <Link
          href="/new-arrivals"
          className="text-sm text-gray-600 transition hover:text-primary"
        >
          View all <AiOutlineArrowRight className="inline" />
        </Link>
      </div>

      {isLoading ? (
        <ProductsSkeleton />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {products?.data?.data.slice(0, 10).map((product: TProduct) => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              className="group block rounded-lg bg-white p-3 shadow transition hover:shadow-lg"
            >
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  height={150}
                  width={150}
                  src={product.images[0]}
                  alt={product.name}
                  className="h-36 w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
              </div>
              <h3 className="mt-2 truncate text-sm font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">
                ${product.price}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewArrivals;
