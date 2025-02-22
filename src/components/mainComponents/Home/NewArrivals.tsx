"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdFiberNew } from "react-icons/md";
import { useGetProductsQuery } from "../../../redux/features/products/productsApi";
import { Loading } from "../../sharedComponents";

const NewArrivals = () => {
  const { data, isLoading } = useGetProductsQuery({
    limit: 12,
    page: 1,
    sort: "",
  });
  return (
    <section className="bg-[#e6ebf1] px-3 pb-16 xl:px-0">
      <div className="container">
        <div className="flex justify-between">
          <h2 className="pb-5 text-2xl font-bold italic text-primary">
            <MdFiberNew className="mr-1 inline text-secondary" />
            New Arrivals
          </h2>
          <a href="" className="text-my-gray-100-100 text-sm">
            View all <AiOutlineArrowRight className="inline" />
          </a>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {data?.data?.products.map((product, i) => (
              <Link href={`/product/${product._id}`} key={i}>
                  <div
                    className="cursor-pointer rounded-md bg-white p-3"
                    onClick={() => console.log("click", product._id)}
                  >
                    <div className="group relative">
                      <Image
                        height="175"
                        width="175"
                        src={product.mainImage}
                        alt=""
                        className="rounded-lg bg-my-gray-200 object-cover"
                        priority
                      />
                      <div className="absolute top-0 left-0 hidden h-full w-full rounded-lg bg-my-gray-200 opacity-40 group-hover:block" />
                    </div>
                    <h3 className="pb-1 text-base font-semibold capitalize text-my-gray-200">
                      {product.name.slice(0, 20)}
                      {product.name.length > 20 && "..."}
                    </h3>
                    <div className="flex space-x-2 text-base font-medium">
                      <p className="text-secondary"> {product.salePrice}</p>
                      {/* Discount price */}
                      <p className="text-my-gray-200 line-through">{product.regularPrice}</p>
                    </div>
                  </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
