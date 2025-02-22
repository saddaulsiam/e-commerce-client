import axios from "axios";
import Image from "next/image";
import Select from "react-select";
import { useState } from "react";
import { BsX } from "react-icons/bs";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

// local
import { useCreateProductMutation } from "../../../../redux/features/products/productsApi";
import { useGetBrandsQuery } from "../../../../redux/features/brands/brandsApi";
import { useGetCategoriesQuery } from "../../../../redux/features/categories/categoriesApi";

const VendorProductAddForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const [postImages, setPostImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedColorOption, setSelectedColorOption] = useState(null);

  const { data: brands } = useGetBrandsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { user: vendor } = useSelector((state) => state.auth);

  const [createProduct, { isError, error }] = useCreateProductMutation();

  const colorsOptions = [
    { value: "red", label: "red" },
    { value: "black", label: "black" },
    { value: "green", label: "green" },
  ];

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setPostImages(imageFiles);

    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(imagePreviews);
  };

  const generateCategoryName = (id) => {
    const { name } = categories?.data.find((c) => c._id === id);
    return name;
  };

  const generateBrandName = (id) => {
    const { name } = brands?.data.find((c) => c._id === id);
    return name;
  };

  const onSubmit = async (inputData) => {
    if (!postImages.length) {
      toast("Please provide a img");
      return;
    }

    toast.info("Creating the product");

    let images = [];
    const uploader = postImages.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "siam-store");

      return axios
        .post(
          "https://api.cloudinary.com/v1_1/dtkl4ic8s/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        )
        .then((response) => {
          const url = response?.data.url;
          images.push(url);
        });
    });

    // Once all the files are uploaded
    axios.all(uploader).then(() => {
      const productData = {
        name: inputData.name,
        description: inputData.description,
        mainImage: images[0],
        images: images,
        // unit: "",
        brand: {
          id: inputData.brand,
          name: generateBrandName(inputData.brand),
        },
        supplier: {
          id: vendor._id,
          name: vendor.storeName,
        },
        category: {
          id: inputData.category,
          name: generateCategoryName(inputData.category),
        },
        colors: selectedColorOption,
        status: inputData.status,
        quantity: inputData.quantity,
        price: inputData.price,
        discount: inputData.discount,
      };

      createProduct(productData).then((res) => {
        if (res.data?.status === "success") {
          toast.success(res.data.message);
          reset();
          setPostImages([]);
          setPreviewImages([]);
        }
      });
    });
  };

  if (isError) {
    console.log(error.data);
    toast.error(error.data.message);
  }

  return (
    <div className="rounded-md bg-white p-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-10">
          <div className="flex w-1/2 flex-col">
            <label htmlFor="productName" className="text-my-gray-200">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              id="productName"
              placeholder="Product Name"
              className="input input-bordered h-12 rounded-md border px-3"
              {...register("name", { required: true })}
            />
          </div>
          <div className="flex w-1/2 flex-col">
            <label htmlFor="category" className="text-my-gray-200">
              Categories
            </label>
            <select
              id="category"
              className="select border-gray-200 text-base font-normal capitalize text-my-gray-100/80"
              {...register("category", { required: true })}
            >
              <option disabled selected className="text-gray-400">
                Select Category
              </option>
              {categories?.data?.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                  className="capitalize"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {previewImages.length > 0 ? (
          <>
            <div className="relative mt-10 grid h-full w-full grid-cols-3 gap-2 overflow-hidden border border-dashed border-gray-300 p-2 sm:rounded-lg">
              {previewImages.map((previewUrl, index) => (
                <Image
                  key={index}
                  src={previewUrl}
                  alt={`Preview ${index}`}
                  height={250}
                  width={250}
                  className="object-cover"
                  priority
                />
              ))}
              <button
                className="absolute top-3 right-1 mr-2.5"
                type="button"
                onClick={() => {
                  setPreviewImages([]);
                  setPostImages([]);
                }}
              >
                <BsX className="box-content h-5 w-5 rounded-full border bg-white p-2 " />
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <label
                htmlFor="uploadPhoto"
                className="mt-10 flex w-full flex-col items-center justify-center rounded-md border border-dashed p-5"
              >
                <h4 className="font-semibold text-my-gray-100/80">
                  Drag & drop product image here
                  <span className="divider text-xs">OR</span>
                </h4>
                <span className="btn mb-5 rounded-md border-none bg-red-100 text-secondary shadow-md hover:bg-red-200">
                  Select File
                </span>
                <p>Upload 300*300</p>
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                id="uploadPhoto"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </>
        )}
        <div className="mt-10 flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            cols=""
            rows="7"
            className="rounded-md border p-3 ring-offset-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            {...register("description", { required: true })}
          />
        </div>
        <div className="mt-10 flex gap-10">
          <div className="flex w-1/2 flex-col">
            <label htmlFor="status" className="text-my-gray-200">
              Status
            </label>
            <select
              id="status"
              className="select border-gray-200 text-base font-normal text-my-gray-100/80"
              {...register("status", { required: true })}
            >
              <option disabled selected className="text-gray-400">
                Select Status
              </option>
              <option>in-stock </option>
              <option>out-of-stock </option>
              <option>discontinued</option>
            </select>
          </div>
          <div className="flex w-1/2 flex-col">
            <label htmlFor="quantity" className="text-my-gray-200">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              placeholder="Quantity"
              className="input input-bordered h-12 rounded-md border px-3"
              {...register("quantity", { required: true })}
            />
          </div>
        </div>
        <div className="mt-10 flex gap-10">
          <div className="flex w-1/2 flex-col">
            <label htmlFor="brands" className="text-my-gray-200">
              Brands
            </label>
            <select
              id="brands"
              className="select border-gray-200 text-base font-normal text-my-gray-100/80"
              {...register("brand", { required: true })}
            >
              <option disabled selected className="text-gray-400">
                Select Brands
              </option>
              {brands?.data?.map((brand) => (
                <option
                  value={brand._id}
                  key={brand._id}
                  className="capitalize"
                >
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-1/2 flex-col">
            <label htmlFor="tags" className="text-my-gray-200">
              Colors
            </label>
            <CreatableSelect
              isMulti
              options={colorsOptions}
              onChange={setSelectedColorOption}
              defaultValue={selectedColorOption}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  height: "45px",
                  borderColor: state.isSelected ? "red" : "#e5e7eb",
                  borderRadius: 8,
                }),
              }}
            />
          </div>
        </div>
        <div className="mt-10 flex gap-10">
          <div className="flex w-1/2 flex-col">
            <label htmlFor="price" className="text-my-gray-200">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price"
              className="input input-bordered h-12 rounded-md border px-3"
              {...register("price", { required: true })}
            />
          </div>
          <div className="flex w-1/2 flex-col">
            <label htmlFor="discount" className="text-my-gray-200">
              Discount
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              placeholder="Discount price"
              className="input input-bordered h-12 rounded-md border px-3"
              {...register("discount", { required: true })}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn mt-10 border-none bg-primary hover:bg-red-600"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default VendorProductAddForm;
