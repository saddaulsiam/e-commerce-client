"use client";
import { VendorProductEditForm } from "@/components/mainComponents/Dashboard/vendor";
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { FilePenLine } from "lucide-react";
import { usePathname } from "next/navigation";

const SingleProductDetails = () => {
  const productId = usePathname();
  const { data } = useGetSingleProductQuery(productId.split("products/")[1]);

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="my-5 flex items-center text-2xl font-semibold text-my-gray-200">
        <FilePenLine className="mr-2 text-primary" /> Edit Product
      </h2>
      <VendorProductEditForm product={data?.data} />
    </div>
  );
};

export default SingleProductDetails;
