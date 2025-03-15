import { TProduct } from "@/types/common";
import Image from "next/image";
import Magnifier from "./Single.Product.Magnifier";

const SingleProductImages = ({ product }: { product: TProduct }) => {
  return (
    <div className="group relative space-y-6">
      {/* Main Image with Zoom */}
      <div className="relative aspect-square transform overflow-hidden">
        <Magnifier
          src={product.images[0]}
          width={650}
          height={500}
          zoomScale={2.5}
          transitionSpeed={0.2}
        />

        <div className="">
          {product.images?.map((image, i) => (
            <button
              key={i}
              className="aspect-square overflow-hidden rounded-lg border-2 border-transparent transition-all hover:border-primary hover:shadow-lg focus:outline-none"
              aria-label={`Thumbnail ${i + 1}`}
            >
              <Image
                src={image}
                width={100}
                height={100}
                alt={`Product Thumbnail ${i + 1}`}
                className="h-full w-full object-cover transition-transform hover:scale-110"
                loading={i > 3 ? "lazy" : "eager"}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProductImages;
