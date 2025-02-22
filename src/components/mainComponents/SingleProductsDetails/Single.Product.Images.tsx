import Image from "next/image";
import { useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const SingleProductImages = ({ data }) => {
  const [image, setImage] = useState(data?.mainImage);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  return (
    <div>
      <Image
        width="500"
        height="550"
        className="h-full w-full object-fill object-center"
        src={image}
        alt=""
        priority
      />
      <div className="w-[500px]">
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {data?.images?.map((image, i) => (
            <SwiperSlide
              key={i}
              onClick={() => setImage(image)}
              className="cursor-pointer"
            >
              <Image src={image} height={200} width={200} alt="" priority />
            </SwiperSlide>
          ))}
          <div
            ref={navigationPrevRef}
            className="absolute top-1/2 bottom-1/2 left-2 z-[2] flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-[#808080] p-4 px-1.5 text-white hover:bg-primary"
          >
            <AiOutlineArrowLeft className="text-xl" />
          </div>
          <div
            ref={navigationNextRef}
            className="absolute top-1/2 bottom-1/2 right-2 z-[2] flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-[#808080] p-4 px-1.5 text-white hover:bg-primary"
          >
            <AiOutlineArrowRight className="text-xl" />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default SingleProductImages;
