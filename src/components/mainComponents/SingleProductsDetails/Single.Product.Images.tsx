"use client";
import { TProduct } from "@/types/common";
import Image from "next/image";
import { useState } from "react";

const SingleProductImages = ({ product }: { product: TProduct }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-auto w-full overflow-hidden rounded-xl bg-gray-50">
        {product?.images?.length ? (
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            width={800}
            height={800}
            className="block h-full w-full object-contain object-center"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100 text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {product?.images?.length > 0 && (
        <div className="grid grid-cols-5 gap-2">
          {product.images.map((image: string, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative block overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                selectedImage === index
                  ? "border-primary"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={image}
                width={100}
                height={100}
                alt=""
                className="block h-full w-full object-cover"
                loading={index > 2 ? "lazy" : "eager"}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleProductImages;
