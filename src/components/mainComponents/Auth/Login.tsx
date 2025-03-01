"use client";

import { Loading } from "@/components/sharedComponents";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authKey } from "@/contants/common";
import useAuth from "@/hooks/useAuth";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/features/auth/authApi";
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
          setToLocalStorage({
            key: authKey.accessToken,
            token: res.data.accessToken,
          });
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
          dispatch(addUser(res.data.user));
          setToLocalStorage({
            key: authKey.accessToken,
            token: res.data.accessToken,
          });
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-2 lg:pt-[11rem]">
      <Card className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-center text-3xl font-semibold">Welcome Back</h2>
        <p className="mb-4 text-center text-sm text-gray-500">
          Log in with email & password
        </p>

        <div className="rounded-lg border p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                {...register("password", { required: true })}
                type={showPass ? "text" : "password"}
                id="password"
                placeholder="******"
              />
              <Button
                type="button"
                className="absolute right-3 top-9 text-lg text-gray-500"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <BsEye /> : <BsEyeSlash />}
              </Button>
            </div>

            <div className="flex justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-primary" />
                <span>Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="bg-gradient-to-r from-rose-500 to-blue-500 bg-clip-text text-transparent hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="relative my-4">
            {/* <hr className="absolute left-0 top-1/2 w-full border-t border-gray-300" /> */}
            <span className="relative z-10 block bg-white px-2 text-center text-sm text-gray-500">
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
            Don’t have an account?{" "}
            <Link href="/register" className="font-medium text-black underline">
              Register
            </Link>
          </p>
        </div>

        {(loading || isLoading || isLogin) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40">
            <Loading />
          </div>
        )}
      </Card>
    </div>
  );
};

export default Login;
