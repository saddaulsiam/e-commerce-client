"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type TProps = {
  name: string;
  img: string;
  order: string;
  href: string;
};

const SwiperCategoriesCard = ({ cProducts }: { cProducts: TProps[] }) => {
  const swiperPrevRef = useRef<any>(undefined);
  const swiperNextRef = useRef<any>(undefined);

  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 5 },
          768: { slidesPerView: 2, spaceBetween: 10 },
          1024: { slidesPerView: 3, spaceBetween: 10 },
        }}
        navigation={{
          prevEl: swiperPrevRef.current,
          nextEl: swiperNextRef.current,
        }}
        grabCursor
        modules={[Navigation]}
        className="mySwiper"
      >
        {cProducts.map((product, index) => (
          <SwiperSlide
            key={index}
            className="cursor-pointer rounded-md bg-white shadow-sm"
          >
            <Link href={product.href} passHref>
              <div className="group relative w-full p-4">
                <div className="relative h-32 w-full overflow-hidden rounded-md">
                  <Image
                    src={product.img}
                    alt={product.name}
                    width={400}
                    height={128}
                    className="w-full rounded-md object-cover object-center transition-transform duration-300 hover:scale-105 group-hover:scale-105"
                    priority
                  />
                </div>
                {/* Card Name */}
                <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-0.5 text-xs text-white">
                  {product.name}
                </div>
                {/* Orders */}
                <div className="absolute right-4 top-4 rounded-full bg-gray-600 px-3 py-0.5 text-xs text-white">
                  {product.order}
                </div>
              </div>
            </Link>
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
    </div>
  );
};

export default SwiperCategoriesCard;
