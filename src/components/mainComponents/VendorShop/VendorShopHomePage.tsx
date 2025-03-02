"use client";

import { ProductsCard } from "@/components/sharedComponents";
import { products } from "@/data/products";
import Image from "next/image";
import { useRef } from "react";
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
  return (
    <div>
      {/* Top DesCounts */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="relative h-80 w-full cursor-pointer">
          <Image
            layout="fill"
            src="https://i.ibb.co/Hr7jLN8/07834833262c015742d3a375b2e14c45.jpg"
            alt=""
            priority
          />
          <div className="absolute inset-0 bg-gray-900/20 transition duration-200 ease-in-out hover:bg-gray-900/40" />
          <div className="absolute right-2 top-2 flex items-center justify-center rounded-full bg-primary p-5 px-7">
            <h2 className="text-2xl text-white">
              75% <br /> Off
            </h2>
          </div>
          <div className="absolute bottom-0 left-0 mb-1 flex gap-10 text-2xl text-white">
            <h2 className="ml-3">৳500</h2>
            <h2>Products Name</h2>
          </div>
        </div>
        <div className="relative h-80 w-full cursor-pointer">
          <Image
            layout="fill"
            src="https://i.ibb.co/Lvzn5SH/3c2b7f2aa016e649c2ea069c057e41ea.jpg"
            alt=""
            priority
          />
          <div className="absolute inset-0 bg-gray-900/20 transition duration-200 ease-in-out hover:bg-gray-900/40" />
          <div className="absolute right-2 top-2 flex items-center justify-center rounded-full bg-primary p-5 px-7">
            <h2 className="text-2xl text-white">
              75% <br /> Off
            </h2>
          </div>
          <div className="absolute bottom-0 left-0 mb-1 flex gap-10 text-2xl text-white">
            <h2 className="ml-3">৳500</h2>
            <h2>Products Name</h2>
          </div>
        </div>
        <div className="h-[312px] w-full space-y-2">
          <div className="relative flex h-1/2 w-full cursor-pointer bg-white p-2">
            <div className="relative h-full w-1/2">
              <Image
                layout="fill"
                src="https://i.ibb.co/1M0yMmh/e2339dad9c17f36ef2cbe6d623844ed5.jpg"
                alt=""
                priority
              />
            </div>
            <div className="relative h-full w-1/2">
              <h3 className="pt-2 text-2xl text-my-gray-200">Products Name</h3>
              <h4 className="absolute bottom-5 text-xl text-primary">৳500</h4>
            </div>
            <div className="absolute inset-0 transition duration-200 ease-in-out hover:bg-gray-900/40" />
          </div>
          <div className="flex h-1/2 w-full gap-2">
            <div className="relative h-full w-1/2">
              <Image
                layout="fill"
                src="https://i.ibb.co/fdWzS0t/c10440515f77289e53b7e4148aae938a.jpg"
                alt=""
                priority
              />
              <div className="absolute inset-0 transition duration-200 ease-in-out hover:bg-gray-900/40" />
              <div className="absolute bottom-1 left-1 mb-0 text-2xl text-primary">
                <h2>৳500</h2>
              </div>
            </div>
            <div className="relative h-full w-1/2">
              <Image
                layout="fill"
                src="https://i.ibb.co/7gjzb3y/946dd002559c3cabfcf38af60b308001.jpg"
                alt=""
                priority
              />
              <div className="absolute inset-0 transition duration-200 ease-in-out hover:bg-gray-900/40" />
              <div className="absolute bottom-1 left-1 mb-0 text-2xl text-secondary">
                <h2>৳500</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Best sealing products */}
      <div className="mt-20">
        <h2 className="pb-5 text-2xl font-bold italic text-primary">
          <AiFillThunderbolt className="inline text-secondary" /> Best Sealing
          Product
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
          {products?.map((product, index) => (
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
      <div className="mt-20">
        <h2 className="pb-5 text-2xl font-bold italic text-primary">
          <AiFillThunderbolt className="inline text-secondary" /> Just For You
        </h2>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 rounded-md sm:grid-cols-3 lg:grid-cols-5">
          {products.map((product, index) => (
            <ProductsCard product={product} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorShopHomePage;
