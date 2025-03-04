"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetBrandsQuery } from "@/redux/features/brands/brandsApi";
import { useGetCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import { useCreateProductMutation } from "@/redux/features/products/productsApi";
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsX } from "react-icons/bs";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";

// Define the option type for colors select
type OptionType = {
  value: string;
  label: string;
};

// Define the form input interface
interface ProductFormInputs {
  name: string;
  category: string;
  description: string;
  status: string;
  quantity: number;
  brand: string;
  price: number;
  discount: number;
}

const VendorProductAddForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<ProductFormInputs>();

  // State variables with proper types
  const [postImages, setPostImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedColorOption, setSelectedColorOption] = useState<
    OptionType[] | null
  >(null);

  const { data: brands } = useGetBrandsQuery(undefined);
  const { data: categories } = useGetCategoriesQuery(undefined);
  const { user: vendor } = useAppSelector(({ state }) => state.auth);

  const [createProduct] = useCreateProductMutation();

  // Example color options
  const colorsOptions: OptionType[] = [
    { value: "red", label: "Red" },
    { value: "black", label: "Black" },
    { value: "green", label: "Green" },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setPostImages(imageFiles);
    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(imagePreviews);
  };

  const generateCategoryName = (id: string): string => {
    const category = categories?.data.find(
      (c: { _id: string; name: string }) => c._id === id,
    );
    return category ? category.name : "";
  };

  const generateBrandName = (id: string): string => {
    const brand = brands?.data.find(
      (b: { _id: string; name: string }) => b._id === id,
    );
    return brand ? brand.name : "";
  };

  const onSubmit: SubmitHandler<ProductFormInputs> = async (inputData) => {
    if (!postImages.length) {
      toast("Please provide an image");
      return;
    }

    toast.info("Creating the product...");

    try {
      // Upload images in parallel using Promise.all
      const images = await Promise.all(
        postImages.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "siam-store");

          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dtkl4ic8s/image/upload",
            formData,
            {
              headers: { "X-Requested-With": "XMLHttpRequest" },
            },
          );
          return response.data.url;
        }),
      );

      const productData = {
        name: inputData.name,
        description: inputData.description,
        mainImage: images[0],
        images: images,
        brand: {
          id: inputData.brand,
          name: generateBrandName(inputData.brand),
        },
        supplier: {
          id: vendor?._id,
          name: vendor?.storeName,
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

      const res = await createProduct(productData);
      if (res.data?.status === "success") {
        toast.success(res.data.message);
        reset();
        setPostImages([]);
        setPreviewImages([]);
      } else {
        toast.error("Failed to create product");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating the product.");
    }
  };

  return (
    <div className="space-y-6 rounded-lg bg-white p-8 shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Product Name & Category */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col">
            <Label
              htmlFor="productName"
              className="mb-1 text-sm font-semibold text-gray-800"
            >
              Product Name
            </Label>
            <Input
              id="productName"
              placeholder="Product Name"
              className="h-12 rounded-md border p-4 shadow-sm transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-primary"
              {...register("name", { required: true })}
            />
          </div>
          <div className="flex flex-col">
            <Label
              htmlFor="category"
              className="mb-1 text-sm font-semibold text-gray-800"
            >
              Category
            </Label>

            <Select>
              <SelectTrigger className="h-12 w-full rounded-md focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories?.data?.map((value, i) => (
                    <SelectItem key={i} value={value} className="capitalize">
                      {value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Image Upload & Preview */}
        <div className="mt-6">
          {previewImages.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {previewImages.map((previewUrl, index) => (
                <div key={index} className="relative">
                  <Image
                    src={previewUrl}
                    alt={`Preview ${index}`}
                    height={250}
                    width={250}
                    className="rounded-md object-cover"
                    priority
                  />
                  {/* Delete button for each image */}
                  <Button
                    variant="destructive"
                    className="absolute right-0 top-0 p-1"
                    type="button"
                    onClick={() => {
                      // Remove the image from the preview and the images state
                      setPreviewImages((prevImages) =>
                        prevImages.filter((_, i) => i !== index),
                      );
                      setPostImages((prevImages) =>
                        prevImages.filter((_, i) => i !== index),
                      );
                    }}
                  >
                    <BsX className="h-5 w-5 text-white" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center rounded-md border-2 border-dashed border-gray-200 p-6">
              <label
                htmlFor="uploadPhoto"
                className="cursor-pointer text-center"
              >
                <h4 className="font-semibold text-gray-600">
                  Drag & drop product image here or
                </h4>
                <span className="text-blue-500">Select File</span>
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
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <Label
            htmlFor="description"
            className="mb-1 text-sm font-semibold text-gray-800"
          >
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Enter product description"
            rows={5}
            className="rounded-md border p-4 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-primary"
            {...register("description", { required: true })}
          />
        </div>

        {/* Status & Quantity */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col">
            <Label
              htmlFor="status"
              className="mb-1 text-sm font-semibold text-gray-800"
            >
              Status
            </Label>
            <Select>
              <SelectTrigger className="h-12 w-full rounded-md focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {["in-stock", "out-of-stock", "discontinued"].map(
                    (value, i) => (
                      <SelectItem key={i} value={value} className="capitalize">
                        {value}
                      </SelectItem>
                    ),
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <Label
              htmlFor="quantity"
              className="mb-1 text-sm font-semibold text-gray-800"
            >
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Quantity"
              className="h-12 rounded-md border p-4 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-primary"
              {...register("quantity", { required: true })}
            />
          </div>
        </div>

        {/* Brands & Colors */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col">
            <Label
              htmlFor="brand"
              className="mb-1 text-sm font-semibold text-gray-800"
            >
              Brand
            </Label>
            <Select>
              <SelectTrigger className="h-12 w-full rounded-md focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Brands</SelectLabel>
                  {brands?.data?.map((value, i) => (
                    <SelectItem key={i} value={value} className="capitalize">
                      {value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <Label
              htmlFor="colors"
              className="mb-1 text-sm font-semibold text-gray-800"
            >
              Colors
            </Label>
            <CreatableSelect
              isMulti
              options={colorsOptions}
              onChange={(value) => setSelectedColorOption(value)}
              value={selectedColorOption}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  height: "45px",
                  borderColor: state.isFocused
                    ? "var(--primary-color)" // Use primary color when focused
                    : selectedColorOption && selectedColorOption.length > 0
                      ? "var(--primary-color)" // Use primary color when items are selected (for multi-select)
                      : "#e5e7eb", // Default border color
                  borderRadius: 8,
                  boxShadow: state.isFocused
                    ? "0 0 0 2px rgba(0, 123, 255, 0.3)" // Optional: add shadow with primary color
                    : "",
                }),
              }}
            />
          </div>
        </div>

        {/* Price & Discount */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col">
            <Label
              htmlFor="price"
              className="mb-1 text-sm font-semibold text-gray-800"
            >
              Price
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="Price"
              className="h-12 rounded-md border p-4 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-primary"
              {...register("price", { required: true })}
            />
          </div>
          <div className="flex flex-col">
            <Label
              htmlFor="discount"
              className="mb-1 text-sm font-semibold text-gray-800"
            >
              Discount
            </Label>
            <Input
              id="discount"
              type="number"
              placeholder="Discount"
              className="h-12 rounded-md border p-4 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-primary"
              {...register("discount", { required: true })}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="mt-6 w-full rounded-md bg-primary py-3 text-white transition-all duration-200 hover:bg-red-600"
        >
          Save Product
        </Button>
      </form>
    </div>
  );
};

export default VendorProductAddForm;
