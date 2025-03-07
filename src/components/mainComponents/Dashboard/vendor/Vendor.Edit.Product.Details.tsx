"use client";

import { usePathname } from "next/navigation";
import { VendorProductEditForm } from ".";
import { useGetSingleProductQuery } from "../../../../redux/features/products/productsApi";

const VendorProductDetails = () => {
  const path = usePathname();
  const { data } = useGetSingleProductQuery(path);

  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <h2 className="my-5 text-2xl font-semibold text-my-gray-200">
          Edit Product
        </h2>
      </div>
      <VendorProductEditForm product={data?.data} />
    </div>
  );
};

export default VendorProductDetails;
