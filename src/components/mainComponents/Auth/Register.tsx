"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";
import { setToLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/common";

const Register = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [postUser, { isLoading }] = useRegisterMutation();
  const { createUser, googleLogIn, setLoading, loading, updateUserProfile } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUser(data.email, data.password);
      if (userCredential.user) {
        await updateUserProfile(data.name);

        const userData = {
          displayName: data.name,
          email: data.email,
        };

        const res = await postUser(userData).unwrap();
        if (res.success) {
          toast.success("Registration Successful");
          reset();
          setToLocalStorage({ key: authKey.accessToken, token: res.data.accessToken });
          router.replace("/");
        }
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await googleLogIn();
      if (userCredential.user) {
        const data = {
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
        };

        const res = await postUser(data).unwrap();
        if (res.success) {
          toast.success("Registration Successful");
          setToLocalStorage({ key: authKey.accessToken, token: res.data.accessToken });
          router.replace("/dashboard");
        }
      }
    } catch (error: any) {
      toast.error(error.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen pt-[14.5rem] justify-center bg-gray-100 px-4">
      <div className="w-full h-full max-w-md rounded-lg bg-white px-8 py-10 shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="bg-gradient-to-r from-secondary to-indigo-700 bg-clip-text text-3xl font-semibold text-transparent">
            Create an Account
          </h2>
          <p className="text-sm text-gray-600">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="name">
              Full Name
            </label>
            <input
              {...register("name", { required: true })}
              className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="John Doe"
              type="text"
              id="name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input
              {...register("email", { required: true })}
              className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="example@gmail.com"
              type="email"
              id="email"
            />
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="******"
              type={showPass ? "text" : "password"}
              id="password"
            />
            <button type="button" className="absolute top-10 right-4 text-lg" onClick={() => setShowPass(!showPass)}>
              {showPass ? <BsEye /> : <BsEyeSlash />}
            </button>
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-gray-700" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", { required: true })}
              className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="******"
              type={showConfirmPass ? "text" : "password"}
              id="confirmPassword"
            />
            <button
              type="button"
              className="absolute top-10 right-4 text-lg"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              {showConfirmPass ? <BsEye /> : <BsEyeSlash />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || isLoading}
            className={`w-full rounded-md px-4 py-2 font-semibold text-white ${
              loading || isLoading ? "bg-gray-400" : "bg-rose-500 hover:bg-rose-600"
            }`}
          >
            {loading || isLoading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <hr className="my-5" />

        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center space-x-2 rounded-md bg-[#4285F4] py-2 text-white"
        >
          <FcGoogle className="text-xl" />
          <span className="text-sm">Continue with Google</span>
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-rose-500 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
