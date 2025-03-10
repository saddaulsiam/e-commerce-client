import { VendorProductCreateForm } from "@/components/mainComponents/Dashboard/vendor";
import { BadgePlus } from "lucide-react";

const AddNewProduct = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <h2 className="flex items-center pb-5 pt-3 text-2xl font-bold text-slate-700">
          <BadgePlus className="mr-2 text-primary" /> Create New Product
        </h2>
      </div>
      <VendorProductCreateForm />
    </div>
  );
};

export default AddNewProduct;
