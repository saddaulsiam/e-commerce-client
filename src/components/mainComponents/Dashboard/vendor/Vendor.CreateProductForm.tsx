"use client";

import CategorySelect from "@/components/sharedComponents/forms/CategorySelect";
import { Button } from "@/components/ui/button";
import ColorsSelect from "@/components/ui/ColorsSelect";
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
import { ColorsOption } from "@/data/colors";
import { useGetBrandsQuery } from "@/redux/features/brands/brandsApi";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { useAppSelector } from "@/redux/hooks";
import { TBrand } from "@/types/common";
import { uploadMultipleFilesToCloudinary } from "@/utils/uploadToCloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BsX } from "react-icons/bs";
import { toast } from "react-toastify";

interface ProductFormInputs {
  name: string;
  category: string;
  description: string;
  status: string;
  stock: number;
  brand: string;
  price: number;
  discount: number;
  colors: ColorsOption[];
}

const VendorCreateProductForm = () => {
  const router = useRouter();
  const { register, handleSubmit, reset, control, setValue, watch } =
    useForm<ProductFormInputs>();

  const [postImages, setPostImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const { user } = useAppSelector(({ state }) => state.auth);
  const [createProduct] = useCreateProductMutation();
  const { data: brands } = useGetBrandsQuery(undefined);

  // Handle file selection and generate preview URLs.
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setPostImages(imageFiles);

    // Create object URLs for previews
    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(imagePreviews);
  };

  // Cleanup preview URLs when component unmounts or images change
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  const onSubmit: SubmitHandler<ProductFormInputs> = async (inputData) => {
    const toastId = toast.loading("Creating the product...");
    try {
      if (!postImages.length) {
        toast("Please provide an image");
        return;
      }
      const images = await uploadMultipleFilesToCloudinary(postImages);

      const productData = {
        ...inputData,
        images,
        supplier: user!.vendor._id,
        // send full colors array of objects, no mapping needed
        colors: inputData.colors,
      };

      const res = await createProduct(productData).unwrap();
      if (res.success) {
        toast.update(toastId, {
          type: "success",
          render: res.message,
          isLoading: false,
          autoClose: 3000,
        });
        reset();
        setPostImages([]);
        setPreviewImages([]);
        router.push("/vendor/products");
      }
    } catch (err: any) {
      toast.update(toastId, {
        type: "error",
        render: err?.data.message,
        isLoading: false,
        autoClose: 3000,
      });
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
            <CategorySelect
              name="category"
              control={control}
              setValue={setValue}
              watch={watch}
              placeholder="Main-Category > Sub-Category > Nested-Subcategory"
            />
          </div>
        </div>

        {/* Image Upload & Preview */}
        <div className="mt-6">
          {previewImages.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {previewImages.map((previewUrl, index) => (
                <div key={previewUrl} className="w-68 relative h-44">
                  <Image
                    src={previewUrl}
                    alt={`Preview ${index}`}
                    layout="fill"
                    className="rounded-md object-cover"
                    priority
                  />
                  <Button
                    variant="destructive"
                    className="absolute right-0 top-0 p-1"
                    type="button"
                    onClick={() => {
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
            rows={4}
            className="rounded-md border p-4 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-primary"
            {...register("description", { required: true })}
          />
        </div>

        {/* Status & Stock */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col">
            <Label
              htmlFor="status"
              className="mb-1 text-sm font-semibold text-gray-800"
            >
              Status
            </Label>
            <Controller
              control={control}
              name="status"
              rules={{ required: true }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-12 w-full rounded-md focus:ring-2 focus:ring-primary">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      {["in-stock", "out-of-stock", "discontinued"].map(
                        (value, i) => (
                          <SelectItem
                            key={i}
                            value={value}
                            className="capitalize"
                          >
                            {value}
                          </SelectItem>
                        ),
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col">
            <Label
              htmlFor="stock"
              className="mb-1 text-sm font-semibold text-gray-800"
            >
              Stock
            </Label>
            <Input
              id="stock"
              type="number"
              placeholder="Stock"
              className="h-12 rounded-md border p-4 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-primary"
              {...register("stock", { required: true })}
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
            <Controller
              control={control}
              name="brand"
              rules={{ required: true }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-12 w-full rounded-md focus:ring-2 focus:ring-primary">
                    <SelectValue placeholder="Select Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Brands</SelectLabel>
                      {brands?.data?.map((brand: TBrand) => (
                        <SelectItem
                          key={brand._id}
                          value={brand.name}
                          className="capitalize"
                        >
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col">
            <Label
              htmlFor="colors"
              className="mb-1 text-sm font-semibold text-gray-800"
            >
              Colors
            </Label>
            <Controller
              control={control}
              name="colors"
              render={({ field }) => (
                <ColorsSelect
                  value={field.value}
                  onChange={(selected) => field.onChange(selected)}
                />
              )}
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
          className="mt-6 w-full rounded-md bg-primary py-3 text-white transition-all duration-200 hover:bg-orange-600"
        >
          Save Product
        </Button>
      </form>
    </div>
  );
};

export default VendorCreateProductForm;
