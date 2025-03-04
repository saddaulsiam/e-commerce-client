import { VendorProductAddForm } from "@/components/mainComponents/Dashboard/vendor";

const AddNewProduct = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <h2 className="my-5 text-2xl font-semibold text-my-gray-200">
          Add New Product
        </h2>
      </div>
      <VendorProductAddForm />
    </div>
  );
};

export default AddNewProduct;
