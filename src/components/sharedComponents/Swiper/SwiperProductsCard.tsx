"use client";

import { ProductsCard } from "@/components/sharedComponents";
import { TProduct } from "@/types/common";
import { useRef } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const SwiperProductsCard = ({ products }: { products: TProduct[] }) => {
  const swiperPrevRef = useRef<any>(undefined);
  const swiperNextRef = useRef<any>(undefined);
  return (
    <Swiper
      breakpoints={{
        0: {
          slidesPerView: 2,
          spaceBetween: 12,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 12,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 12,
        },
        1440: {
          slidesPerView: 5,
          spaceBetween: 12,
        },
      }}
      navigation={{
        prevEl: swiperPrevRef.current,
        nextEl: swiperNextRef.current,
      }}
      modules={[Navigation]}
      className="mySwiper"
    >
      {products?.map((product: TProduct, index: number) => (
        <SwiperSlide
          key={index}
          className="rounded-md bg-white shadow-2xl shadow-gray-300"
        >
          <ProductsCard product={product} />
        </SwiperSlide>
      ))}

      {/* Navigation Arrows */}
      <div
        ref={swiperPrevRef}
        className="absolute bottom-1/2 left-2 top-1/2 z-[2] flex -translate-y-1/2 transform items-center justify-center rounded-full bg-[#808080] p-4 px-1.5 text-white hover:bg-primary"
      >
        <AiOutlineArrowLeft className="text-xl" />
      </div>
      <div
        ref={swiperNextRef}
        className="absolute bottom-1/2 right-2 top-1/2 z-[2] flex -translate-y-1/2 transform items-center justify-center rounded-full bg-[#808080] p-4 px-1.5 text-white hover:bg-primary"
      >
        <AiOutlineArrowRight className="text-xl" />
      </div>
    </Swiper>
  );
};

export default SwiperProductsCard;
