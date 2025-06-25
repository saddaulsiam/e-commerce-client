"use client";

import AddressSelect from "@/components/sharedComponents/forms/AddressSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateMyVendorMutation } from "@/redux/features/vendor/vendorApi";
import { useAppSelector } from "@/redux/hooks";
import { uploadToCloudinary } from "@/services/uploadToCloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillCameraFill } from "react-icons/bs";
import { toast } from "react-toastify";

interface FormValues {
  region: string;
  city: string;
  area: string;
  street: string;
  storeName: string;
  phoneNumber: string;
  storeLogo: string | File;
  storeBanner: string | File;
}

const VendorUpdateAccountSettings = () => {
  const { user } = useAppSelector(({ state }) => state.auth);
  const [updateVendor] = useUpdateMyVendorMutation();

  // Set fallback defaults for images
  const fallbackBanner = "/banners/storeBanner.jpeg";
  const fallbackLogo = "/logo/storeLogo.jpeg";

  // Initialize state for images
  const [banner, setBanner] = useState<string | File>(fallbackBanner);
  const [logo, setLogo] = useState<string | File>(fallbackLogo);

  const [bannerPreview, setBannerPreview] = useState<string>(fallbackBanner);
  const [logoPreview, setLogoPreview] = useState<string>(fallbackLogo);

  // Update states when vendor data becomes available
  useEffect(() => {
    if (user?.vendor) {
      const { storeBanner, storeLogo } = user?.vendor;
      setBanner(storeBanner || fallbackBanner);
      setLogo(storeLogo || fallbackLogo);
      setBannerPreview(storeBanner || fallbackBanner);
      setLogoPreview(storeLogo || fallbackLogo);
    }
  }, [user?.vendor]);

  // Handle image file changes and update preview
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: any,
    setPreview: any,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Initialize React Hook Form with proper default values
  const { register, handleSubmit, control, watch, setValue, getValues, reset } =
    useForm<FormValues>();

  useEffect(() => {
    if (user?.vendor) {
      reset({
        region: user?.vendor.address.region,
        city: user?.vendor.address.city,
        area: user?.vendor.address.area,
        street: user?.vendor.address.street,
        storeName: user?.vendor.storeName,
        phoneNumber: String(user?.vendor.phoneNumber),
        storeBanner: user?.vendor.storeBanner || fallbackBanner,
        storeLogo: user?.vendor.storeLogo || fallbackLogo,
      });
    }
  }, [user?.vendor, reset]);

  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Updating...");

    const logoURL =
      logo instanceof File ? await uploadToCloudinary(logo) : logo;
    const bannerURL =
      banner instanceof File ? await uploadToCloudinary(banner) : banner;

    data.storeLogo = logoURL;
    data.storeBanner = bannerURL;

    const res = await updateVendor({ id: user?.vendor._id, data }).unwrap();
    if (res.success) {
      toast.update(toastId, {
        type: "success",
        render: res.message,
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h2 className="pt-3 text-2xl font-semibold text-gray-800">
        Account Settings
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          {/* Banner Section */}
          <div className="relative h-72">
            <Image
              alt="Store Banner"
              layout="fill"
              className="object-cover object-center"
              src={bannerPreview}
              priority
            />
            <Label
              htmlFor="banner-change"
              className="absolute right-4 top-4 flex cursor-pointer items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-medium text-primary shadow hover:bg-gray-100"
            >
              <BsFillCameraFill /> Change Banner
            </Label>
            <Input
              type="file"
              id="banner-change"
              className="hidden"
              accept="image/*"
              onChange={(e) =>
                handleImageChange(e, setBanner, setBannerPreview)
              }
            />
          </div>

          {/* Logo Section */}
          <div className="relative -mt-12 flex justify-center">
            <div className="relative h-24 w-24">
              <Image
                src={logoPreview}
                alt="Store Logo"
                layout="fill"
                className="rounded-full border-4 border-white shadow-md"
              />
              <Label
                htmlFor="logo-change"
                className="absolute -right-2 bottom-2 flex cursor-pointer items-center justify-center rounded-full bg-gray-100 p-2 text-primary shadow-md hover:bg-gray-200"
              >
                <BsFillCameraFill className="h-4 w-4" />
              </Label>
              <Input
                type="file"
                id="logo-change"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setLogo, setLogoPreview)}
              />
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
            <div className="flex flex-col">
              <Label htmlFor="storeName" className="pb-1 text-gray-600">
                Store Name
              </Label>
              <Input
                type="text"
                id="storeName"
                placeholder="Enter your store name"
                {...register("storeName")}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="phone" className="pb-1 text-gray-600">
                Phone Number
              </Label>
              <Input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                {...register("phoneNumber")}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="dynamicSelect" className="pb-1 text-gray-600">
                Street / City / Area
              </Label>
              <AddressSelect
                control={control}
                setValue={setValue}
                watch={watch}
                name="area"
                placeholder={`${user?.vendor.address.region} > ${user?.vendor.address.city} > ${user?.vendor.address.area}`}
              />
              {getValues("street") !== "" && getValues("area") === "" ? (
                <p className="text-red-500">Complete the process</p>
              ) : null}
            </div>
            <div className="flex flex-col">
              <Label htmlFor="address" className="pb-1 text-gray-600">
                Full Address
              </Label>
              <Input
                type="text"
                id="address"
                placeholder="Enter your store address"
                {...register("street")}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="border-t bg-gray-50 p-6">
            <Button
              type="submit"
              className="hover:bg-primary-dark w-full bg-primary"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VendorUpdateAccountSettings;
