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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Details */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-gray-600">Full Name</label>
          <Input
            {...register("name", { required: true })}
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-md border bg-white px-3 py-2 focus:border-primary focus:ring-primary"
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
            className="w-full rounded-md border bg-white px-3 py-2 focus:border-primary focus:ring-primary"
            required
          />
        </div>
      </div>

      {/* Address Selection */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-gray-600">Area</label>
          <AddressSelect
            control={control}
            setValue={setValue}
            watch={watch}
            name="area"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-600">
            Street Address
          </label>
          <Input
            {...register("street", { required: true })}
            type="text"
            placeholder="House# 123, Street# 123, ABC Road"
            className="w-full rounded-md border bg-white px-3 py-2 focus:border-primary focus:ring-primary"
            required
          />
        </div>
      </div>

      {/* Email Input */}
      <div>
        <label className="mb-1 block text-sm text-gray-600">Email</label>
        <Input
          {...register("email")}
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-md border bg-white px-3 py-2 focus:border-primary focus:ring-primary"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-5">
        <Button type="submit" className="w-full text-lg" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Create New Address"}
        </Button>
      </div>
    </form>
  );
};

export default CreateAddressForm;
