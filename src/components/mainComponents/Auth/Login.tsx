"use client";

import { authKey } from "@/contants/common";
import { addUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setToLocalStorage } from "@/utils/local-storage";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { useLoginMutation, useRegisterMutation } from "../../../redux/features/auth/authApi";

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const [postUser, { isLoading }] = useRegisterMutation();
  const { setLoading, loading, signIn, googleLogIn } = useAuth();
  const [login, { isLoading: isLogin }] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const userCredential = await signIn(data.email, data.password);
      if (userCredential.user) {
        const res = await login({ email: userCredential.user.email }).unwrap();
        if (res.success) {
          reset();
          toast.success("Login Successful");
          dispatch(addUser(res.data.user));
          setToLocalStorage({ key: authKey.accessToken, token: res.data.accessToken });
          router.replace(redirectTo);
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
          toast.success("Login Successful");
          setToLocalStorage({ key: authKey.accessToken, token: res.data.accessToken });
          router.replace(redirectTo);
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
        <div className="mb-8 text-center">
          <h2 className="bg-gradient-to-r from-secondary to-indigo-700 bg-clip-text text-3xl font-semibold text-transparent">
            Welcome Back!
          </h2>
          <p className="text-sm text-gray-600">Login to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              {...register("password", { required: true })}
              className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="******"
              type={showPass ? "text" : "password"}
              id="password"
            />
            <button type="button" className="absolute top-10 right-4 text-lg" onClick={() => setShowPass(!showPass)}>
              {showPass ? <BsEye /> : <BsEyeSlash />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="bg-gradient-to-r from-secondary to-indigo-700 bg-clip-text text-transparent hover:underline"
            >
              Forgot Password
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading || isLoading || isLogin}
            className={`w-full rounded-md px-4 py-2 font-semibold text-white ${
              loading || isLoading || isLogin ? "bg-gray-400" : "bg-rose-500 hover:bg-rose-600"
            }`}
          >
            {loading || isLoading || isLogin ? "Logging in..." : "Login"}
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
          Don’t have an account?{" "}
          <Link href="/register" className="text-rose-500 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
