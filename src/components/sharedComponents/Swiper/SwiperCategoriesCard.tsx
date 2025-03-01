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
          className="cursor-pointer rounded-md bg-white shadow-2xl shadow-gray-300"
          key={index}
        >
          <Link href={product.href} passHref>
            <div className="group relative w-full p-4">
              <div className="h-32 w-full group-hover:opacity-70">
                <div className="p-1">
                  <Image
                    src={product.img}
                    alt={product.name}
                    width={400}
                    height={128}
                    className="rounded-md object-contain object-center lg:object-cover"
                    priority
                  />
                </div>
              </div>
              {/* Card Name */}
              <div className="absolute left-8 top-8 rounded-full bg-primary px-4 py-0.5 text-sm text-white">
                {product.name}
              </div>
              {/* Orders */}
              <div className="absolute right-8 top-8 rounded-full bg-gray-600 px-4 py-0.5 text-sm text-white">
                {product.order}
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
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

export default SwiperCategoriesCard;
