"use client";

import { Footer, Navbar } from "@/components/sharedComponents";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import PrivateRoute from "@/providers/PrivateRoute";
import { useRegisterVendorMutation } from "@/redux/features/vendor/vendorApi";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface VendorRegisterFormData {
  storeName: string;
  storeDescription: string;
  storeLogo: string;
  storeBanner: string;
  address: {
    street: string;
    city: string;
    area: string;
    address: string;
  };
}

const VendorRegister = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VendorRegisterFormData>();
  const { user } = useAppSelector(({ state }) => state.auth);
  const [registerVendor] = useRegisterVendorMutation(undefined);
  const router = useRouter();
  const { setLoadUser } = useAuth();

  const onSubmit = async (data: FieldValues) => {
    data.userId = user?._id;
    data.email = user?.email;

    const res = await registerVendor(data).unwrap();
    if (res.success) {
      setLoadUser(true);
      reset();
      toast.success(res.message);
      router.push("/vendor/dashboard");
    }
  };

  // Helper function to generate input classes based on error state
  const inputClasses = (fieldError: unknown) =>
    `mt-1 w-full rounded border px-3 py-2 focus:outline-none ${
      fieldError
        ? "border-red-500 focus:border-red-500"
        : "border-gray-300 focus:border-blue-500"
    }`;

  return (
    <PrivateRoute>
      <Navbar />
      <div className="flex min-h-[calc(100vh-180px)] items-center justify-center bg-gray-100">
        <div className="w-full max-w-2xl rounded bg-white p-8 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-bold">
            Vendor Registration
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Store Name */}
            <div>
              <label htmlFor="storeName" className="block text-gray-700">
                Store Name
              </label>
              <input
                id="storeName"
                {...register("storeName", {
                  required: "Store name is required",
                })}
                className={inputClasses(errors.storeName)}
                placeholder="Enter your store name"
              />
              {errors.storeName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.storeName.message}
                </p>
              )}
            </div>

            {/* Store Description */}
            <div>
              <label htmlFor="storeDescription" className="block text-gray-700">
                Store Description
              </label>
              <textarea
                id="storeDescription"
                {...register("storeDescription", {
                  required: "Store Description is required",
                })}
                className={inputClasses(errors.storeDescription)}
                placeholder="Describe your store"
              />
              {errors.storeDescription && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.storeDescription.message}
                </p>
              )}
            </div>

            {/* Store Logo */}
            <div>
              <label htmlFor="storeLogo" className="block text-gray-700">
                Store Logo URL
              </label>
              <input
                type="text"
                id="storeLogo"
                {...register("storeLogo", {
                  required: "Store Logo is required",
                })}
                className={inputClasses(errors.storeLogo)}
                placeholder="Enter URL for your store logo"
              />
              {errors.storeLogo && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.storeLogo.message}
                </p>
              )}
            </div>

            {/* Store Banner */}
            <div>
              <label htmlFor="storeBanner" className="block text-gray-700">
                Store Banner URL
              </label>
              <input
                type="text"
                id="storeBanner"
                {...register("storeBanner", {
                  required: "Store Banner is required",
                })}
                className={inputClasses(errors.storeBanner)}
                placeholder="Enter URL for your store banner"
              />
              {errors.storeBanner && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.storeBanner.message}
                </p>
              )}
            </div>

            {/* Address Fields */}
            <fieldset className="rounded border border-gray-300 p-4">
              <legend className="font-medium text-gray-700">Address</legend>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Street */}
                <div>
                  <label
                    htmlFor="address.street"
                    className="block text-gray-700"
                  >
                    Street
                  </label>
                  <input
                    id="address.street"
                    {...register("address.street", {
                      required: "Street is required",
                    })}
                    className={inputClasses(errors.address?.street)}
                    placeholder="Enter your street"
                  />
                  {errors.address?.street && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address.street.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label htmlFor="address.city" className="block text-gray-700">
                    City
                  </label>
                  <input
                    id="address.city"
                    {...register("address.city", {
                      required: "City is required",
                    })}
                    className={inputClasses(errors.address?.city)}
                    placeholder="Enter your city"
                  />
                  {errors.address?.city && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address.city.message}
                    </p>
                  )}
                </div>

                {/* Area */}
                <div>
                  <label htmlFor="address.area" className="block text-gray-700">
                    Area
                  </label>
                  <input
                    id="address.area"
                    {...register("address.area", {
                      required: "Area is required",
                    })}
                    className={inputClasses(errors.address?.area)}
                    placeholder="Enter your area"
                  />
                  {errors.address?.area && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address.area.message}
                    </p>
                  )}
                </div>

                {/* Full Address */}
                <div>
                  <label
                    htmlFor="address.address"
                    className="block text-gray-700"
                  >
                    Full Address
                  </label>
                  <input
                    id="address.address"
                    {...register("address.address", {
                      required: "Full address is required",
                    })}
                    className={inputClasses(errors.address?.address)}
                    placeholder="Enter your full address"
                  />
                  {errors.address?.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address.address.message}
                    </p>
                  )}
                </div>
              </div>
            </fieldset>

            <Button
              type="submit"
              className="w-full rounded bg-primary py-2 text-white transition hover:bg-orange-700"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </PrivateRoute>
  );
};

export default VendorRegister;
