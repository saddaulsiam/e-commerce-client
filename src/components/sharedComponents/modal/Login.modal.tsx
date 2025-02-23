"use client";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { Fragment, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Dialog, Transition } from "@headlessui/react";

// local
import Loading from "../loading/Loading";
import useAuth from "../../../hooks/useAuth";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";

const LoginModal = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [postUser, { isLoading }] = useRegisterMutation();
  const { setLoading, loading, signIn, googleLogIn, facebookLogIn } = useAuth();

  const [showPass, setShowPass] = useState(false);

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          reset();
          toast.success("Login Successful");
          router.replace(router.query.redirectTo || "/");
        }
      })
      .catch((error) => {
        toast.error(error.code);
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    googleLogIn()
      .then((userCredential) => {
        if (userCredential.user) {
          postUser(userCredential.user).then((res) => {
            if (res.data?.status === "success") {
              toast.success("Login Successful");
              setIsOpen(false);
              router.replace(router.query.redirectTo || "/");
            }
          });
        }
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };

  const handleFacebookLogin = () => {
    facebookLogIn()
      .then((userCredential) => {
        if (userCredential.user) {
          postUser(userCredential.user)
            .then((res) => {
              if (res.data?.status === "success") {
                toast.success("Login Successful");
                router.replace(router.query.redirectTo || "/");
              }
            })
            .catch((error) => {
              console.log(error);
              toast.error(error);
            });
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const email = error.customData.email;

        if (errorCode === "auth/account-exists-with-different-credential") {
          toast.error(email + " This email exists please try google signIn");
        }
      });
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center ">
              <Dialog.Panel className="transform overflow-hidden">
                <div className="w-[450px] rounded-lg bg-white px-12 py-10 shadow-sm">
                  <div>
                    <div className="mb-10 flex flex-col items-center justify-center space-y-1">
                      <h2 className="text-3xl font-semibold">Welcome To E-commerce</h2>
                      <p className="text-sm">Log in with email & password</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-my-gray-200" htmlFor="email">
                            Email
                          </label>
                          <input
                            {...register("email", { required: true })}
                            className="block h-10 w-full rounded-md border px-3"
                            placeholder="exmple@gmail.com"
                            autoComplete="off"
                            type="email"
                            name="email"
                            id="email"
                          />
                        </div>
                        <div className="relative">
                          <label className=" text-sm text-my-gray-200" htmlFor="password">
                            Password
                          </label>
                          <input
                            {...register("password", { required: true })}
                            className="block  h-10 w-full rounded-md border px-3"
                            placeholder="******"
                            type={showPass ? "text" : "password"}
                            name="password"
                            id="password"
                          />

                          <button
                            type="button"
                            className="absolute top-9 right-4 text-lg"
                            onClick={() => setShowPass(!showPass)}
                          >
                            {showPass ? <BsEye /> : <BsEyeSlash />}
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="label cursor-pointer">
                            <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                            <span className="label-text pl-1">Remember me</span>
                          </label>
                          <Link
                            href="/forgot-password"
                            className="label-text cursor-pointer bg-gradient-to-r from-secondary to-indigo-700 bg-clip-text font-semibold text-transparent decoration-violet-500 decoration-2 hover:underline"
                          >
                            Forgot Password
                          </Link>
                        </div>
                        <button
                          type="submit"
                          className="h-10 w-full rounded-md bg-rose-500 text-base font-semibold text-white "
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                  <hr className="my-5 " />
                  <div className="space-y-3">
                    <div
                      onClick={handleGoogleLogin}
                      className="flex h-10 cursor-pointer items-center justify-center space-x-2 rounded-md bg-[#4285F4]"
                    >
                      <span className="rounded-full bg-slate-200 p-1">
                        <FcGoogle />
                      </span>
                      <p className="text-sm text-white">Continue with Google</p>
                    </div>
                    <div
                      onClick={handleFacebookLogin}
                      className="flex h-10 cursor-pointer items-center justify-center space-x-2 rounded-md bg-[#3B5998]"
                    >
                      <span className="rounded-full bg-slate-200 p-1">
                        <FaFacebookF className="text-[#3B5998]" />
                      </span>
                      <p className="text-sm text-white">Continue with Facebook</p>
                    </div>
                    <div className="flex justify-center">
                      <p className="mt-3 text-sm text-my-gray-100">
                        Don’t have account ?{" "}
                        <Link href="/register" passHref>
                          <span className="cursor-pointer text-base font-medium text-black underline">Register</span>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
                {loading && (
                  <div className="absolute flex h-full w-full items-center justify-center bg-gray-900/40">
                    <Loading />
                  </div>
                )}
                {isLoading && (
                  <div className="absolute flex h-full w-full items-center justify-center bg-gray-900/40">
                    <Loading />
                  </div>
                )}
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default LoginModal;
