"use client";

import { Loading } from "@/components/sharedComponents/loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authKey } from "@/constants/common";
import useAuth from "@/hooks/useAuth";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { addUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setToLocalStorage } from "@/utils/localStorage";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Register = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const [postUser, { isLoading }] = useRegisterMutation();
  const { createUser, googleLogIn, updateUserProfile } = useAuth();

  const onSubmit = async (data: FieldValues) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUser(data.email, data.password);
      if (userCredential?.user) {
        await updateUserProfile(data.name);

        const userData = {
          displayName: data.name,
          email: data.email,
        };

        const res = await postUser(userData).unwrap();
        if (res.success) {
          dispatch(addUser(res.data.user));
          reset();
          setToLocalStorage({
            key: authKey.ACCESS_TOKEN,
            token: res.data.accessToken,
          });
          router.replace("/login");
        }
      }
    } catch (error: any) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        toast.error("Email already in use. Please try another one.");
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await googleLogIn();
      if (userCredential?.user) {
        const data = {
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
        };

        const res = await postUser(data).unwrap();
        if (res.success) {
          toast.success("Registration Successful");
          dispatch(addUser(res.data.user));
          setToLocalStorage({
            key: authKey.ACCESS_TOKEN,
            token: res.data.accessToken,
          });
          router.replace(redirectTo);
        }
      }
    } catch (error: any) {
      toast.error(error.code);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-180px)] items-center justify-center bg-gray-100 px-2">
      <Card className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-center text-3xl font-semibold">
          Create an Account
        </h2>
        <p className="mb-4 text-center text-sm text-gray-500">
          Sign up to get started
        </p>

        <div className="rounded-lg border p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                {...register("name", { required: true })}
                type="text"
                id="name"
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: true })}
                type="email"
                id="email"
                placeholder="example@gmail.com"
                autoComplete="off"
              />
            </div>

            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password", { required: true, minLength: 6 })}
                type={showPass ? "text" : "password"}
                id="password"
                placeholder="******"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-lg text-gray-500"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <BsEye /> : <BsEyeSlash />}
              </button>
            </div>

            <div className="relative">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                {...register("confirmPassword", { required: true })}
                type={showConfirmPass ? "text" : "password"}
                id="confirmPassword"
                placeholder="******"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-lg text-gray-500"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              >
                {showConfirmPass ? <BsEye /> : <BsEyeSlash />}
              </button>
            </div>

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>

          <div className="relative my-4">
            <span className="relative block bg-white px-2 text-center text-sm text-gray-500">
              or
            </span>
          </div>

          <Button
            variant="outline"
            className="flex w-full items-center justify-center space-x-2"
            onClick={handleGoogleLogin}
          >
            <FcGoogle />
            <span>Continue with Google</span>
          </Button>

          <p className="mt-3 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-black underline">
              Login
            </Link>
          </p>
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40">
            <Loading />
          </div>
        )}
      </Card>
    </div>
  );
};

export default Register;
