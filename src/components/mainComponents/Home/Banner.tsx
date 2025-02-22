"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Pagination, Autoplay } from "swiper/modules";
import React, { useState, useEffect, useRef, useCallback } from "react";

// local
import banners from "../../../../public/images/banners";
import { useGetCategoriesQuery } from "../../../redux/features/categories/categoriesApi";

const Banner = () => {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBg, setCurrentBg] = useState([]);

  const { data: categories } = useGetCategoriesQuery();

  let bannerBgColor = [];

  useEffect(() => {
    setCurrentBg(bannerBgColor);
  }, []);

  const updateIndex = useCallback(() => setCurrentSlide(swiperRef?.current?.swiper?.realIndex), []);

  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;
    if (swiperInstance) {
      swiperInstance.on("slideChange", updateIndex);
    }
    return () => {
      if (swiperInstance) {
        swiperInstance.off("slideChange", updateIndex);
      }
    };
  }, [updateIndex]);
  return (
    <header
      className="mt-[7.7rem] lg:mt-44"
      style={{
        backgroundColor: currentBg[currentSlide],
      }}
    >
      <div className="flex xl:container">
        <div className="hidden w-[22%] bg-white shadow-lg lg:block">
          <ul className="py-1 text-sm">
            {categories?.data?.map(({ name, _id, icon }, index) => (
              <Link href={`/product?category=${name.toLowerCase()}`} key={_id}>
                <li className="flex cursor-pointer justify-between px-3 py-2 font-medium text-my-gray-200 hover:bg-primary hover:text-white">
                  <div className="flex space-x-3">
                    <Image src={icon} alt={name} width="20" height="20" priority />
                    <p className="capitalize">{name}</p>
                  </div>
                  <MdKeyboardArrowRight className="text-xl" />
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-[78%]">
          <Swiper
            style={{
              "--swiper-pagination-color": "#003566",
              "--swiper-pagination-bullet-size": "10px",
            }}
            ref={swiperRef}
            className="mySwiper h-40 w-full md:h-72 lg:h-full"
            grabCursor={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            slidesPerView={"auto"}
            pagination={{
              clickable: true,
            }}
            loop={true}
            modules={[Pagination, Autoplay]}
          >
            {banners.map(({ id, img, bg }) => (
              <SwiperSlide key={id}>
                {bannerBgColor.push(bg)}
                <Image src={img} alt="" className="object-fill object-center" layout="fill" priority />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </header>
  );
};

export default Banner;
