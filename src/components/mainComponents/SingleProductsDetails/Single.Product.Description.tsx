import { TProduct } from "@/types/common";
import React from "react";

const SingleProductDescription = ({ product }: { product: TProduct }) => {
  return (
    <div className="mt-5">
      <p className="text-base leading-relaxed text-slate-600">
        {product?.description}
      </p>
    </div>
  );
};

export default SingleProductDescription;
