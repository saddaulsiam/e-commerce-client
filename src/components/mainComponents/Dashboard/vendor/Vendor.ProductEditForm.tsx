"use client";

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
import colorsOptions from "@/data/colors";
import { useGetBrandsQuery } from "@/redux/features/brands/brandsApi";
import { useGetCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import { useUpdateProductMutation } from "@/redux/features/products/productsApi";
import { useAppSelector } from "@/redux/hooks";
import { uploadMultipleFilesToCloudinary } from "@/services/uploadToCloudinary";
import { TBrand, TCategory, TProduct } from "@/types/common";
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
  colors: string[];
}

// Define an interface to manage each image item
interface ImageItem {
  id: string;
  url: string;
  file?: File; // present for new images
  isNew: boolean;
}

const VendorProductEditForm = ({ product }: { product: TProduct }) => {
  // Remove images from form default values since we manage them separately
  const { register, handleSubmit, reset, control } =
    useForm<ProductFormInputs>();

  // Manage images (both existing and new) in separate state
  const [images, setImages] = useState<ImageItem[]>([]);

  // When product prop changes, reset the form and initialize the images state.
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        category: product.category,
        description: product.description,
        status: product.status || "in-stock",
        stock: Number(product.stock) || 0,
        brand: product.brand,
        price: Number(product.price) || 0,
        discount: product.discount || 0,
        colors: product.colors || [],
      });
      if (product.images && product.images.length) {
        const initialImages: ImageItem[] = product.images.map((url) => ({
          id: url, // using the URL as a unique id for existing images (assumes uniqueness)
          url,
          isNew: false,
        }));
        setImages(initialImages);
      }
    }
  }, [product, reset]);

  const router = useRouter();
  const { data: brands } = useGetBrandsQuery(undefined);
  const { data: categories } = useGetCategoriesQuery(undefined);
  const { user: vendor } = useAppSelector(({ state }) => state.auth);
  const [updateProduct, { isError, error, isLoading }] =
    useUpdateProductMutation();

  // Handle file selection: create ImageItem objects for new images and append them.
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files || []);
    const newImageItems: ImageItem[] = files
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random()}`, // generate a unique id
        url: URL.createObjectURL(file),
        file,
        isNew: true,
      }));
    setImages((prev) => [...prev, ...newImageItems]);
  };

  // Cleanup preview URLs for new images when component unmounts or images change
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.isNew) {
          URL.revokeObjectURL(image.url);
        }
      });
    };
  }, [images]);

  const onSubmit: SubmitHandler<ProductFormInputs> = async (inputData) => {
    try {
      // Separate images: existing ones and new ones to upload.
      const existingImageUrls = images
        .filter((img) => !img.isNew)
        .map((img) => img.url);
      const newImageItems = images.filter(
        (img) => img.isNew && img.file,
      ) as ImageItem[];
      const newFiles: File[] = newImageItems.map((img) => img.file!);

      let uploadedUrls: string[] = [];
      if (newFiles.length) {
        toast.info("Uploading new images...");
        uploadedUrls = await uploadMultipleFilesToCloudinary(newFiles);
      }

      // Combine existing and new image URLs.
      const finalImages = [
        ...existingImageUrls,
        ...uploadedUrls.filter((url) => url !== ""),
      ];

      const productData = {
        ...inputData,
        images: finalImages,
        supplier: vendor?._id,
      };

      const res = await updateProduct({
        data: productData,
        id: product._id,
      }).unwrap();
      if (res.success) {
        toast.success(res.message);
        reset(productData);
        // Reset images state to updated final images as existing images.
        setImages(finalImages.map((url) => ({ id: url, url, isNew: false })));
        router.push("/vendor/products");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as any).data.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isLoading) {
      toast.info("Updating the product...");
    }
  }, [isLoading]);

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
            <Controller
              control={control}
              name="category"
              rules={{ required: true }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-12 w-full rounded-md focus:ring-2 focus:ring-primary">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories?.data.flatMap((category: TCategory) =>
                        category.subcategories.flatMap((subCategory) =>
                          subCategory?.subcategories.map((item) => (
                            <SelectItem
                              key={`${category.name}-${subCategory.name}-${item.name}`}
                              value={item.name}
                              className="capitalize"
                            >
                              {item.name}
                            </SelectItem>
                          )),
                        ),
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {/* Image Upload & Preview */}
        <div className="mt-6">
          {images.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {images.map((img) => (
                <div key={img.id} className="w-68 relative h-44">
                  <Image
                    src={img.url}
                    alt="Preview"
                    layout="fill"
                    className="rounded-md object-cover"
                    priority
                  />
                  <Button
                    variant="destructive"
                    className="absolute right-0 top-0 p-1"
                    type="button"
                    onClick={() => {
                      if (img.isNew) {
                        URL.revokeObjectURL(img.url);
                      }
                      setImages((prev) =>
                        prev.filter((image) => image.id !== img.id),
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
                accept="image/*"
                id="uploadPhoto"
                onChange={handleFileSelect}
                className="hidden"
                multiple
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
                  value={colorsOptions.filter((opt) =>
                    field.value?.includes(opt.value),
                  )}
                  onChange={(selected) =>
                    field.onChange(selected.map((s) => s.value))
                  }
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

export default VendorProductEditForm;
