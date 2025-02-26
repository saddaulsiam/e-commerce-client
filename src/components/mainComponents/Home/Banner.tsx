"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import categories from "@/data/categories";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import banners from "../../../../public/banners";

const Banner = () => {
  // State to track the current slide index
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  // State to store background colors for each banner
  const [bannerBgColors, setBannerBgColors] = useState<string[]>([]);

  // Ref to access the Swiper instance
  const swiperRef = useRef<SwiperRef | null>(null);

  // Extract background colors from banners and set them in state
  useEffect(() => {
    const colors = banners.map((banner) => banner.bg);
    setBannerBgColors(colors);
  }, []);

  // Callback to update current slide index on slide change
  const handleSlideChange = useCallback(() => {
    if (swiperRef.current) {
      setCurrentSlide(swiperRef.current.swiper.realIndex);
    }
  }, []);

  // Attach and detach the slide change event listener
  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance) {
      swiperInstance.on("slideChange", handleSlideChange);
    }
    return () => {
      if (swiperInstance) {
        swiperInstance.off("slideChange", handleSlideChange);
      }
    };
  }, [handleSlideChange]);

  return (
    <header
      // className="mt-[7.7rem] lg:mt-44"
      className="mt-0.5"
      style={{
        // Set background color based on the current slide
        backgroundColor: bannerBgColors[currentSlide] || "#fff",
      }}
    >
      <div className="mx-auto flex xl:container">
        {/* Vertical Menubar Sidebar */}
        <div className="relative hidden w-[22%] shadow-lg lg:block">
          <Menubar className="h-full items-stretch bg-white p-3">
            {categories.map((category, i) => (
              <MenubarMenu key={i}>
                <MenubarTrigger className="my-0.5 w-full rounded px-4 py-2 text-left text-slate-600 hover:bg-gray-100">
                  {category.name} <ChevronRight className="ml-auto h-4 w-4" />
                </MenubarTrigger>
                {category.subcategories &&
                  category.subcategories.length > 0 && (
                    <MenubarContent
                      className="z-10 min-w-[250px] rounded-none shadow-none"
                      side="right"
                      sideOffset={-5}
                    >
                      <MenubarLabel>{category.name}</MenubarLabel>
                      {category.subcategories.map((sub, j) => (
                        <MenubarSub key={j}>
                          <MenubarSubTrigger className="w-full px-4 py-2 text-left hover:bg-gray-50">
                            {sub.name}
                          </MenubarSubTrigger>
                          {sub.subcategories &&
                            sub.subcategories.length > 0 && (
                              <MenubarSubContent className="z-10 min-w-[200px]">
                                <MenubarLabel>{category.name}</MenubarLabel>
                                {sub.subcategories.map((item, k) => (
                                  <MenubarItem
                                    asChild
                                    key={k}
                                    className="px-4 py-2 hover:bg-gray-100"
                                  >
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
            style={
              {
                // Custom CSS properties for Swiper pagination
                "--swiper-pagination-color": "hsl(var(--primary))",
                "--swiper-pagination-bullet-size": "10px",
              } as CSSProperties
            }
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
            onSlideChange={handleSlideChange}
          >
            {banners.map(({ id, img }) => (
              <SwiperSlide key={id}>
                <div className="relative h-full w-full">
                  <Image
                    src={img}
                    alt="Banner"
                    className="object-fill object-center"
                    layout="fill"
                    priority
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </header>
  );
};

export default Banner;
