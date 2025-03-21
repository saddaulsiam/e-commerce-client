"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authKey } from "@/constants/common";
import useAuth from "@/hooks/useAuth";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/features/auth/authApi";
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
import Loading from "../loader/Loading";

type LoginModalProps = {
  openLoginModal: boolean;
  setOpenLoginModal: (open: boolean) => void;
};

const LoginModal = ({ openLoginModal, setOpenLoginModal }: LoginModalProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const [postUser, { isLoading }] = useRegisterMutation();
  const [login, { isLoading: isLogin }] = useLoginMutation();
  const { setLoading, loading, signIn, googleLogIn } = useAuth();

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
            key: authKey.ACCESS_TOKEN,
            token: res.data.accessToken,
          });
          setOpenLoginModal(!openLoginModal);
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
            key: authKey.ACCESS_TOKEN,
            token: res.data.accessToken,
          });
          setOpenLoginModal(!openLoginModal);
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
    <Dialog open={openLoginModal} onOpenChange={setOpenLoginModal}>
      <DialogContent className="max-w-md rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-semibold">
            Welcome Back
          </DialogTitle>
          <p className="text-center text-sm text-gray-500">
            Log in with email & password
          </p>
        </DialogHeader>

        <Card className="space-y-4 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: "Email is required" })}
                type="email"
                id="email"
                placeholder="example@gmail.com"
                // autoComplete="off"
              />
            </div>

            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password", { required: "Password is required" })}
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

            <div className="flex justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-primary" />
                <span>Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="bg-gradient-to-r from-rose-500 to-blue-500 bg-clip-text text-transparent hover:underline"
              >
                Forgot Password
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-orange-600 active:scale-95"
            >
              Login
            </Button>
          </form>

          <div className="relative my-4">
            <hr className="absolute left-0 top-1/2 w-full border-t border-gray-300" />
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
            Don’t have an account?
            <Link
              href="/register"
              className="ml-1 font-medium text-black underline hover:text-primary"
            >
              Register
            </Link>
          </p>
        </Card>

        {(loading || isLoading || isLogin) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40">
            <Loading />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
