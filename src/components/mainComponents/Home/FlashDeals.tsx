"use client";

import { useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// local
import { AiFillThunderbolt, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Loading, ProductsCard } from "../../sharedComponents";
import { useGetProductsQuery } from "../../../redux/features/products/productsApi";

const FlashDeals = () => {
  const swiperPrevRef1 = useRef(null);
  const swiperNextRef1 = useRef(null);

  const { data, isLoading } = useGetProductsQuery({
    limit: 15,
    page: 1,
    sort: "",
  });

  return (
    <section className="mt-0 bg-[#e6ebf1] py-16 px-3 xl:px-0">
      <div className="container">
        <div className="flex justify-between">
          <h2 className="pb-5 text-2xl font-bold italic text-primary">
            <AiFillThunderbolt className="inline text-secondary" /> Flash Deals
          </h2>
          <a href="" className="text-sm text-my-gray-100">
            View all <AiOutlineArrowRight className="inline" />
          </a>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
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
              prevEl: swiperPrevRef1.current,
              nextEl: swiperNextRef1.current,
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {data?.data?.products?.map((product, index) => (
              <SwiperSlide key={index} className="rounded-md bg-white shadow-2xl shadow-gray-300">
                <ProductsCard product={product} />
              </SwiperSlide>
            ))}
            <div
              ref={swiperPrevRef1}
              className="absolute top-1/2 bottom-1/2 left-2 z-[2] flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-[#808080] p-4 px-1.5 text-white hover:bg-primary"
            >
              <AiOutlineArrowLeft className="text-xl" />
            </div>
            <div
              ref={swiperNextRef1}
              className="absolute top-1/2 bottom-1/2 right-2 z-[2] flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-[#808080] p-4 px-1.5 text-white hover:bg-primary"
            >
              <AiOutlineArrowRight className="text-xl" />
            </div>
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default FlashDeals;
