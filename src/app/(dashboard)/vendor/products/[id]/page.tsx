import { VendorProductEditForm } from "@/components/mainComponents/Dashboard/vendor";
import { FilePenLine } from "lucide-react";

export const metadata = {
  title: "Vendor Edit Product",
  description: "Edit your product in the vendor dashboard.",
};

export default function SingleProductDetails({ params }: any) {
  const { id } = params;

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="my-5 flex items-center text-2xl font-semibold text-my-gray-200">
        <FilePenLine className="mr-2 text-primary" /> Edit Product
      </h2>
      <VendorProductEditForm id={id} />
    </div>
  );
}
