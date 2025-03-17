"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { useAddNewAddressMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AddressSelect from "./AddressSelect";

const CreateAddressForm = () => {
  const { register, handleSubmit, reset, control, setValue, watch } = useForm();
  const { setLoadUser } = useAuth();

  const { user } = useAppSelector(({ state }) => state.auth);
  const [addAddress, { isLoading }] = useAddNewAddressMutation();

  // Handle form submission
  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await addAddress({ id: user?._id, data }).unwrap();
      if (res.success) {
        toast.success(res.message);
        reset();
        setLoadUser(true);
      }
    } catch (error: any) {
      toast.error(error.massage || "Failed to add address");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-5">
      {/* Personal Details */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-gray-600">Full Name</label>
          <Input
            {...register("name", { required: true })}
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-md border px-3 py-2 focus:border-primary focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-600">
            Phone Number
          </label>
          <Input
            {...register("phoneNumber", { required: true })}
            type="number"
            placeholder="Enter your phone number"
            className="w-full rounded-md border px-3 py-2 focus:border-primary focus:ring-primary"
            required
          />
        </div>
      </div>

      {/* Address Selection */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-gray-600">Street</label>
          <AddressSelect
            control={control}
            setValue={setValue}
            watch={watch}
            name="area"
            placeholder={`${user?.vendor.address.street} > ${user?.vendor.address.city} > ${user?.vendor.address.area}`}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-600">City</label>
          <Input
            {...register("address", { required: true })}
            type="text"
            placeholder="House# 123, Street# 123, ABC Road"
            className="w-full rounded-md border px-3 py-2 focus:border-primary focus:ring-primary"
            required
          />
        </div>
      </div>

      {/* Email Input */}
      <div>
        <label className="mb-1 block text-sm text-gray-600">
          Email (Optional)
        </label>
        <Input
          {...register("email")}
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-md border px-3 py-2 focus:border-primary focus:ring-primary"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full rounded-md bg-primary py-2 text-lg font-medium text-white transition duration-200 hover:bg-opacity-90"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Create New Address"}
      </Button>
    </form>
  );
};

export default CreateAddressForm;
