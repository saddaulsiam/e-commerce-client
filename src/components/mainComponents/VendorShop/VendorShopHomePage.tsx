"use client";

import { Loading, ProductsCard } from "@/components/sharedComponents";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/common";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  AiFillThunderbolt,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const VendorShopHomePage = () => {
  const swiperPrevRef2 = useRef<any>(undefined);
  const swiperNextRef2 = useRef<any>(undefined);

  const { data: products, isLoading } = useGetAllProductsQuery({});

  if (isLoading) return <Loading />;

  return (
    <>
      {/* Best sealing products */}
      <div className="mt-10">
        <h2 className="pb-5 text-2xl font-bold italic text-primary">
          <AiFillThunderbolt className="inline text-primary" /> Best Sealing
          Products
        </h2>
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
          navigation={{
            prevEl: swiperPrevRef2.current,
            nextEl: swiperNextRef2.current,
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {products?.data?.data?.map((product: TProduct, index: number) => (
            <SwiperSlide
              key={index}
              className="rounded-md bg-white shadow-2xl shadow-gray-300"
            >
              <ProductsCard product={product} />
            </SwiperSlide>
          ))}
          <div
            ref={swiperPrevRef2}
            className="absolute bottom-1/2 left-2 top-1/2 z-[2] flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-[#808080] p-4 px-1.5 text-white hover:bg-primary"
          >
            <AiOutlineArrowLeft className="text-xl" />
          </div>
          <div
            ref={swiperNextRef2}
            className="absolute bottom-1/2 right-2 top-1/2 z-[2] flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-[#808080] p-4 px-1.5 text-white hover:bg-primary"
          >
            <AiOutlineArrowRight className="text-xl" />
          </div>
        </Swiper>
      </div>

      {/* Just for you products */}
      <div className="my-20">
        <h2 className="pb-5 text-2xl font-bold italic text-primary">
          <AiFillThunderbolt className="inline text-primary" /> Just For You
        </h2>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 rounded-md sm:grid-cols-3 lg:grid-cols-5">
          {products?.data?.data?.map((product: any, index: number) => (
            <ProductsCard product={product} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default VendorShopHomePage;
