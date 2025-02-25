"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import categories from "@/data/categories";
import banners from "../../../../public/banners";

const Banner = () => {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBg, setCurrentBg] = useState([]);

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
      <div className="flex xl:container mx-auto">
        {/* Vertical Menubar Sidebar */}
        <div className="relative w-[22%] shadow-lg hidden lg:block">
          <Menubar className="flex flex-col h-full items-stretch bg-white shadow-md py-5">
            {categories.map((category, i) => (
              <MenubarMenu key={i}>
                <MenubarTrigger className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                  {category.name}
                </MenubarTrigger>
                {category.subcategories && category.subcategories.length > 0 && (
                  <MenubarContent className="min-w-[250px] z-10" side="right" sideOffset={-5}>
                    {category.subcategories.map((sub, j) => (
                      <MenubarSub key={j}>
                        <MenubarSubTrigger className="w-full text-left px-4 py-2 hover:bg-gray-50">
                          {sub.name}
                        </MenubarSubTrigger>
                        {sub.subcategories && sub.subcategories.length > 0 && (
                          <MenubarSubContent className="min-w-[200px] z-10">
                            {sub.subcategories.map((item, k) => (
                              <MenubarItem asChild key={k} className="px-4 py-2 hover:bg-gray-100">
                                <Link href={item.href}>{item.name}</Link>
                              </MenubarItem>
                            ))}
                          </MenubarSubContent>
                        )}
                      </MenubarSub>
                    ))}
                  </MenubarContent>
                )}
              </MenubarMenu>
            ))}
          </Menubar>
        </div>

        {/* Banner Swiper */}
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
            {banners.map(({ id, img }) => (
              <SwiperSlide key={id}>
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
