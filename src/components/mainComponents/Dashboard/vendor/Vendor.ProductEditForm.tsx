"use client";

import { Button } from "@/components/ui/button";
import { useGetBrandsQuery } from "@/redux/features/brands/brandsApi";
import { useGetCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import { useUpdateProductMutation } from "@/redux/features/products/productsApi";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsX } from "react-icons/bs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const VendorProductAddEditForm = ({ product }) => {
  const filePickerRef = useRef(null);
  const { register, handleSubmit, reset } = useForm();

  const [postImages, setPostImages] = useState(null);
  const [imagePreview, setImagePreview] = useState([null]);

  const { data: brands } = useGetBrandsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { user: vendor } = useSelector((state) => state.auth);
  const [updateProduct, { isError, error, isLoading }] =
    useUpdateProductMutation();

  const onSubmit = async (inputData) => {
    const formData = new FormData();
    formData.append("upload_preset", "socio-trend");

    if (postImages) {
      formData.append("file", postImages);
      await fetch(`https://api.cloudinary.com/v1_1/dtkl4ic8s/image/upload`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => (inputData.mainImage = result.url));
    }

    const productData = {
      name: inputData.name || product.name,
      description: inputData.description || product.description,
      mainImage: inputData.mainImage || product.mainImage,
      // images: [],
      // unit: "",
      brand: {
        name: inputData.brands || product.brand.name,
        id: "6353865e74ff6e04b4962df1",
      },
      supplier: {
        name: vendor.storeName,
        id: vendor._id,
      },
      category: {
        name: inputData.category || product.category.name,
        id: "63538a2ee108941d84749d90",
      },
      colors: inputData.colors || product.colors,
      status: inputData.status || product.status,
      quantity: inputData.quantity || product.quantity,
      price: inputData.price || product.price,
      discount: inputData.discount || product.discount,
    };

    updateProduct({ data: productData, id: product._id }).then((res) => {
      if (res.data?.status === "success") {
        toast.success(res.data.message);
        reset();
        setPostImages([]);
        setImagePreview([]);
      }
    });
  };

  if (isError) {
    toast.error(error.data.message);
  }
  if (isLoading) {
    toast.info("Updating the product");
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
              defaultValue={product?.name}
              {...register("name")}
            />
          </div>
          <div className="flex w-1/2 flex-col">
            <label htmlFor="category" className="text-my-gray-200">
              Category
            </label>
            <select
              id="category"
              className="select border-gray-200 text-base font-normal text-my-gray-100/80"
              {...register("category")}
            >
              <option disabled selected className="text-gray-400">
                {product?.category?.name}
              </option>
              {categories?.data.map((category) => (
                <option key={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
        {imagePreview.length > 0 ? (
          <>
            <div className="relative mt-10 h-[19rem] w-full overflow-hidden border border-dashed border-gray-300 p-2 sm:rounded-lg">
              <Image
                src={imagePreview[0] || product?.mainImage}
                alt="image01"
                layout="fill"
                objectFit="contain"
                priority
              />
              <Button
                className="absolute right-1 top-3 mr-2.5"
                type="button"
                onClick={() => {
                  setImagePreview([]);
                  setPostImages([]);
                }}
              >
                <BsX className="box-content h-5 w-5 rounded-full border bg-white p-2" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <div onClick={() => filePickerRef.current.click()}>
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
                ref={filePickerRef}
                accept="image/*"
                type="file"
                // required
                name="uploadPhoto"
                id="uploadPhoto"
                onChange={(e) => {
                  const files = e.target.files;
                  const images = [];
                  for (let i = 0; i < files.length; i++) {
                    images.push(URL.createObjectURL(files[i]));
                  }
                  setImagePreview([...postImages, ...images]);
                  setPostImages(e.target.files[0]);
                }}
                className="hidden"
                // {...register("img", )}
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
            {...register("description")}
            defaultValue={product?.description}
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
              {...register("status")}
            >
              <option disabled selected className="text-gray-400">
                {product?.status}
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
              placeholder="quantity"
              className="input input-bordered h-12 rounded-md border px-3"
              {...register("quantity")}
              defaultValue={product?.quantity}
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
              {...register("brands")}
            >
              <option disabled selected className="text-gray-400">
                {product?.brand?.name}
              </option>
              {brands?.data.map((brand) => (
                <option key={brand._id}>{brand.name}</option>
              ))}
            </select>
          </div>
          <div className="flex w-1/2 flex-col">
            <label htmlFor="colors" className="text-my-gray-200">
              Colors
            </label>
            <input
              type="text"
              name="colors"
              id="colors"
              placeholder="colors like phone, laptop, camera"
              className="input input-bordered h-12 rounded-md border px-3"
              {...register("colors")}
              defaultValue={product?.colors}
            />
          </div>
        </div>
        <div className="mt-10 flex gap-10">
          <div className="flex w-1/2 flex-col">
            <label htmlFor="price" className="text-my-gray-200">
              Regular Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="regular price"
              className="input input-bordered h-12 rounded-md border px-3"
              {...register("price")}
              defaultValue={product?.price}
            />
          </div>
          <div className="flex w-1/2 flex-col">
            <label htmlFor="discount" className="text-my-gray-200">
              Sale Price
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              placeholder="sale price"
              className="input input-bordered h-12 rounded-md border px-3"
              {...register("discount")}
              defaultValue={product?.discount}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="btn mt-10 border-none bg-primary hover:bg-red-600"
        >
          Save Product
        </Button>
      </form>
    </div>
  );
};

export default VendorProductAddEditForm;
