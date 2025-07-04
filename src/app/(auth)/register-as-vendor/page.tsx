"use client";

import AddressSelect from "@/components/sharedComponents/forms/AddressSelect";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useLogOut } from "@/hooks/useLogOut";
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
    region: string;
    city: string;
    area: string;
    street: string;
  };
}

const VendorRegister = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VendorRegisterFormData>();
  const { user } = useAppSelector(({ state }) => state.auth);
  const [registerVendor] = useRegisterVendorMutation(undefined);
  const router = useRouter();
  const { setLoadUser } = useAuth();
  const handleLogOut = useLogOut();

  const onSubmit = async (values: FieldValues) => {
    try {
      const payload = {
        userId: user?._id,
        email: user?.email,
        storeName: values.storeName,
        storeDescription: values.storeDescription,
        address: {
          region: values.region,
          city: values.city,
          area: values.area,
          street: values.address.street,
        },
      };

      const res = await registerVendor(payload).unwrap();

      if (res?.success) {
        setLoadUser(true);
        reset();
        toast.success(res?.message || "Vendor registered successfully");
        router.push("/vendor/dashboard");
        handleLogOut();
      }
    } catch (err: any) {
      const apiError =
        err?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";
      toast.error(apiError);
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
    <PrivateRoute role="customer">
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

            {/* Address Fields */}
            <fieldset className="rounded border border-gray-300 p-4">
              <legend className="font-medium text-gray-700">
                Store Address
              </legend>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-gray-600">Area</label>
                  <AddressSelect
                    control={control}
                    setValue={setValue}
                    watch={watch}
                    name="area"
                    required={true}
                  />
                </div>

                {/* Full Address */}
                <div>
                  <label
                    htmlFor="address.address"
                    className="block text-gray-700"
                  >
                    Street
                  </label>
                  <input
                    id="address.address"
                    {...register("address.street", {
                      required: "Full address is required",
                    })}
                    className={inputClasses(errors.address?.street)}
                    placeholder="Enter your full address"
                  />
                  {errors.address?.street && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address.street.message}
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
    </PrivateRoute>
  );
};

export default VendorRegister;
