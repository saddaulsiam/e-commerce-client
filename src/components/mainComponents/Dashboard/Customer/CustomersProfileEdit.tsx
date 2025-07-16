"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useChangeUserProfileMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillCameraFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { toast } from "react-toastify";

type ProfileFormData = {
  displayName: string;
  phoneNumber: string;
  email?: string;
  birthDate?: string;
  photo: string;
};

const DashboardCustomersProfileEdit = () => {
  const { refreshUser } = useAuth();
  const { user } = useAppSelector(({ state }) => state.auth);
  const [profilePhoto, setProfilePhoto] = useState(
    user?.profile.photo || "/user-avatar.jpg",
  );
  const [changeProfile, { isLoading }] = useChangeUserProfileMutation();
  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>();

  useEffect(() => {
    reset({
      displayName: user?.displayName || "",
      phoneNumber: user?.phoneNumber || "",
      email: user?.email || "",
      birthDate: user?.profile.birthDate || "",
    });
  }, [
    reset,
    user?.displayName,
    user?.email,
    user?.phoneNumber,
    user?.profile.birthDate,
  ]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePhoto(imageUrl);

      const image = await uploadToCloudinary(file);
      setValue("photo", image);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    const res = await changeProfile({ id: user?._id, data }).unwrap();
    if (res.success) {
      toast.success(res.message);
      refreshUser();
    }
  };

  return (
    <div className="mb-10 rounded-lg bg-white px-4 py-6 shadow-sm sm:p-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primary">
          <MdAccountCircle className="mr-3 inline text-primary" />
          <span> Edit Profile</span>
        </h2>

        <Link href="/profile">
          <Button>Back to Profile</Button>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 rounded-md bg-white p-5"
      >
        <div className="relative inline-flex">
          <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
            <AvatarImage src={profilePhoto} />
            <AvatarFallback className="bg-primary/10">
              {user?.displayName?.slice(0, 1)}
            </AvatarFallback>
          </Avatar>

          <label htmlFor="user-profile">
            <span className="absolute -right-3 bottom-0 cursor-pointer rounded-full bg-slate-300 p-2 text-base hover:bg-primary hover:text-white">
              <BsFillCameraFill />
            </span>
          </label>
          <input
            type="file"
            id="user-profile"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* First Name */}
          <div>
            <label className="text-sm text-my-gray-200">First Name</label>
            <input
              {...register("displayName", {
                required: "First name is required",
              })}
              type="text"
              placeholder="First Name"
              className="h-10 w-full rounded border px-2 text-sm outline-1 focus:outline-primary"
            />
            {errors.displayName && (
              <p className="text-xs text-red-500">
                {errors.displayName.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-sm text-my-gray-200">Phone Number</label>
            <input
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
              type="tel"
              placeholder="Contact Number"
              className="h-10 w-full rounded border px-2 text-sm outline-1 focus:outline-primary"
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Email (Disabled) */}
          <div>
            <label className="text-sm text-my-gray-200">Email</label>
            <input
              {...register("email")}
              type="email"
              disabled
              title="Can't change email"
              placeholder="Email"
              className="h-10 w-full rounded border bg-gray-100 px-2 text-sm outline-1 focus:outline-primary"
            />
          </div>

          {/* Birth Date */}
          <div>
            <label className="text-sm text-my-gray-200">Birth date</label>
            <input
              {...register("birthDate")}
              type="date"
              className="h-10 w-full rounded border px-2 text-sm outline-1 focus:outline-primary"
            />
          </div>
        </div>

        <Button type="submit" className="mt-8 w-full">
          {isLoading ? "Saving" : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default DashboardCustomersProfileEdit;
