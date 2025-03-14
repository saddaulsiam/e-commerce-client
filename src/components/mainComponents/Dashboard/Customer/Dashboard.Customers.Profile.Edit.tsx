"use client";

import { useUpdateMutation } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillCameraFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addUser } from "../../../../redux/features/auth/authSlice";
import DashboardCustomerSideBarNavigation from "./Dashboard.Customer.SideBar.Navigation";
import { Button } from "@/components/ui/button";
import { uploadToCloudinary } from "@/services/uploadToCloudinary";

const DashboardCustomersProfileEdit = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSideNavigation, setShowSideNavigation] = useState(null);

  const { user } = useAppSelector(({ state }) => state.auth);
  const [updateProfile, { error }] = useUpdateMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile({
          file: file,
          previewURL: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("upload_preset", "siam-store");

    if (selectedFile?.file) {
      data.photoURL = uploadToCloudinary(selectedFile?.file)
    }

    const profile = {
      displayName: data.firstName + " " + data.lastName,
      phoneNumber: data.phoneNumber,
      birthDate: data.birthDate,
      photoURL: data.photoURL || "/user-avatar.jpg",
    };

    updateProfile({ email: user.email, profile }).then((res) => {
      if (res.data?.status === "success") {
        reset();
        setLoading(false);
        toast.success(res.data?.message);
        router.push("/customer/profile");
        dispatch(addUser(res.data.data));
      }
    });
  };

  if (error) {
    setLoading(false);
    toast.error(error.data?.message);
  }

  return (
    <div className="mb-10">
      <div className="grid grid-cols-2 gap-y-5">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-primary">
            <MdAccountCircle className="mr-3 inline text-primary" />
            <span> Edit Profile</span>
          </h2>
        </div>
        <div className="flex justify-end lg:hidden">
          <Button className="text-2xl font-thin " onClick={() => setShowSideNavigation(true)}>
            <GiHamburgerMenu />
          </Button>
        </div>
        <div className="flex lg:justify-end">
          <Link href="/customer/profile">
            <Button className="button">Back Profile</button>
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 rounded-md bg-white p-5">
          <div className="relative inline-flex">
            <Image
              height="60"
              width="60"
              className="rounded-full "
              src={
                selectedFile?.previewURL ||
                user?.photoURL ||
                "https://bonik-react.vercel.app/assets/images/faces/ralph.png"
              }
              alt="User profile picture"
              priority
            />
            <label htmlFor="user-profile">
              <span className="group absolute bottom-0 -right-5 rounded-full bg-slate-300 p-2 text-lg hover:bg-secondary">
                <BsFillCameraFill className="group-hover:text-white" />
              </span>
            </label>
            <input
              type="file"
              accept=""
              name="user-profile"
              id="user-profile"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm text-my-gray-200" htmlFor="first-name">
                First Name
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                placeholder="First Name"
                className="h-10 w-full rounded border px-2 text-sm outline-1 focus:outline-primary"
                {...register("firstName", { required: true })}
                defaultValue={user?.displayName?.split(" ")[0]}
              />
              {errors.firstName && <span className="text-secondary">This field is required</span>}
            </div>
            <div>
              <label className="text-sm text-my-gray-200" htmlFor="last-name">
                Last Name
              </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                placeholder="Last Name"
                defaultValue={user?.displayName?.split(" ")[1]}
                {...register("lastName", { required: true })}
                className="h-10 w-full rounded border px-2 text-sm outline-1 focus:outline-primary"
              />
              {errors.lastName && <span className="text-secondary">This field is required</span>}
            </div>
            <div>
              <label className="text-sm text-my-gray-200" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                disabled
                name="email"
                id="email"
                placeholder="Email"
                className="h-10 w-full rounded border px-2 outline-1 focus:outline-primary"
                value={user?.email}
              />
            </div>
            <div>
              <label className="text-sm text-my-gray-200" htmlFor="phone-number">
                Phone Number
              </label>
              <input
                type="number"
                name="phone-number"
                id="phone-number"
                className="h-10 w-full rounded border px-2 outline-1 focus:outline-primary"
                placeholder="Contact Number"
                defaultValue={user?.phoneNumber}
                {...register("phoneNumber", { required: true })}
              />
              {errors.phoneNumber && <span className="text-secondary">This field is required</span>}
            </div>
            <div>
              <label className="text-sm text-my-gray-200" htmlFor="date-of-birth">
                Birth date
              </label>
              <input
                type="date"
                name="date-of-birth"
                id="date-of-birth"
                className="h-10 w-full rounded border px-2 outline-1 focus:outline-primary"
                defaultValue={user?.birthDate || "2023-01-01"}
                {...register("birthDate", { required: true })}
              />
              {errors.birthDate && <span className="text-secondary">This field is required</span>}
            </div>
          </div>
          <Button
            disabled={loading ? true : false}
            type="submit"
            className="mt-5 rounded-md bg-primary py-2  px-4 text-sm font-semibold text-white transition-all ease-in-out hover:bg-secondary disabled:cursor-not-allowed"
          >
            {loading ? "processing ..." : "Save Changes"}
          </Button>
        </div>
      </form>
      {showSideNavigation && <DashboardCustomerSideBarNavigation setShowSideNavigation={setShowSideNavigation} />}
    </div>
  );
};

export default DashboardCustomersProfileEdit;
