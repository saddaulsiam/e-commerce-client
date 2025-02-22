"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { useRegisterMutation } from "../../../redux/features/auth/customer/customerAuthApi";

const Register = () => {
  const router = useRouter();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors: formError },
  } = useForm();

  const [postUser, { isLoading }] = useRegisterMutation();
  const { loading, setLoading, createUser, updateUserProfile } = useAuth();

  const [showPass, setShowPass] = useState(false);

  const onSubmit = async (data) => {
    createUser(data.email, data.password, data.name)
      .then((userCredential) => {
        console.log(userCredential);
        if (userCredential.user) {
          // sendEmailVerification(userCredential.user).then(() => {
          //   Swal.fire({
          //     icon: "info",
          //     title: "Check your email & verify",
          //   }).then((result) => {
          //     if (result.isConfirmed) {
          //       window.open(
          //         "https://mail.google.com/mail/u/0/#inbox",
          //         "_blank"
          //       );
          //     }
          //   });
          // });

          updateUserProfile(data.name).then(() => {
            // reset();
            postUser(userCredential.user).then((res) => {
              console.log(res);
              if (res.data?.success) {
                toast.success(res.data?.message);
                setLoading(false);
                router.push("/login");
              }
            });
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <section className="flex justify-center bg-slate-100 pt-52 pb-6">
      <div className="w-[500px] rounded-lg bg-white px-16 py-10 shadow-sm">
        <div>
          <div className="mb-10 flex flex-col items-center justify-center space-y-1">
            <h2 className="text-xl font-semibold">Create Your Account</h2>
            <p className="text-sm">Please fill all forms to continued</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-my-gray-200" htmlFor="email">
                  Full Name
                </label>
                <input
                  {...register("name", { required: true, minLength: 4 })}
                  // autoComplete="off"
                  className="block h-10 w-full rounded-md border px-3"
                  placeholder="Saddaul Siam"
                  type="text"
                  name="name"
                  id="email"
                />
                {formError?.name?.type === "required" && <p className="text-secondary">Name is required</p>}
                {formError?.name?.type === "minLength" && <p className="text-secondary">Name must be 4 characters</p>}
              </div>
              <div>
                <label className="text-sm text-my-gray-200" htmlFor="email">
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  // autoComplete="off"
                  className="block h-10 w-full rounded-md border px-3"
                  placeholder="exmple@gmail.com"
                  type="email"
                  name="email"
                  id="email"
                />
                {formError?.email && <p className="text-secondary">Email is required</p>}
              </div>
              <div className="relative">
                <label className="text-sm text-my-gray-200" htmlFor="password">
                  Password
                </label>
                <input
                  className="block h-10 w-full rounded-md border px-3 text-sm"
                  // placeholder="minimum 6 character 1 number 1 uppercase 1 symbol"
                  placeholder="Password"
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                  // autoComplete="off"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                />
                <button type="button" className="absolute top-9 right-4 text-lg" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <BsEye /> : <BsEyeSlash />}
                </button>
                {formError?.password?.type === "required" && <p className="text-secondary">Password is required</p>}
                {formError?.password?.type === "minLength" && (
                  <p className="text-secondary">Password must be 6 characters</p>
                )}
                {formError?.password?.type === "maxLength" && (
                  <p className="text-secondary">Password must be less than 20 characters</p>
                )}
                {formError?.password?.type === "pattern" && (
                  <p className="text-secondary">
                    Password must have one Uppercase one lower case, one number and one special character.
                  </p>
                )}
              </div>
              <div className="relative">
                <label className="text-sm text-my-gray-200" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  // autoComplete="off"
                  {...register("confirmPassword", {
                    validate: (value) => {
                      const { password } = getValues();
                      return password === value;
                    },
                  })}
                  className="block h-10 w-full rounded-md border px-3 text-sm"
                  placeholder="Confirm Password"
                  type={showPass ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                />
                <button type="button" className="absolute top-8 right-4 text-lg" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <BsEye /> : <BsEyeSlash />}
                </button>
                {formError?.confirmPassword?.type === "validate" && (
                  <p className="text-secondary">Passwords don&apos;t match!</p>
                )}
              </div>
              <div>
                <input type="checkbox" name="condition" id="condition" />
                <label htmlFor="condition" className="ml-3 cursor-pointer text-sm text-my-gray-100">
                  By signing up, you agree to{" "}
                  <Link href="/">
                    <span className="font-semibold underline">Terms & Condition</span>
                  </Link>
                </label>
              </div>
              <button type="submit" className="h-10 w-full rounded-md bg-rose-500 text-base font-semibold text-white ">
                Create Account
              </button>
            </div>
          </form>
        </div>
        <hr className="my-5 " />
        <div className="space-y-3">
          <div className="flex h-10 cursor-pointer items-center justify-center space-x-2 rounded-md bg-[#4285F4]">
            <span className="rounded-full bg-slate-200 p-1">
              <FcGoogle />
            </span>
            <p className="text-sm text-white">Continue with Google</p>
          </div>
          <div className="flex justify-center">
            <p className="mt-3 text-sm text-my-gray-100">
              Already have account ?{" "}
              <Link href="/login">
                <span className="cursor-pointer text-base font-medium text-black underline">Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* {loading && (
        <div className="absolute flex h-full w-full items-center justify-center bg-gray-900/40">
          <Loading />
        </div>
      )}
      {isLoading && (
        <div className="absolute flex h-full w-full items-center justify-center bg-gray-900/40">
          <Loading />
        </div>
      )} */}
    </section>
  );
};

export default Register;
