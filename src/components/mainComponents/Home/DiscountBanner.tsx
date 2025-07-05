import Image from "next/image";
import React from "react";

const DiscountBanner = () => {
  return (
    <section className="bg-white">
      <div className="container">
        <div className="grid h-96 grid-cols-3 gap-5 md:h-[40rem] lg:h-96">
          <div className="relative col-span-3 cursor-pointer lg:col-span-1">
            <Image
              src="https://i.ibb.co/Ydr9psB/image.webp"
              alt=""
              className="object-fit object-center"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          </div>
          <div className="relative col-span-3 cursor-pointer lg:col-span-2">
            <Image
              fill
              className="object-fit object-center"
              src="https://i.ibb.co/7YwL2NX/photo-1542992015-4a0b729b1385.webp"
              alt=""
              priority
              sizes="(min-width: 1024px) 66vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountBanner;
