"use client";

import Link from "next/link";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm();
  const { forgotPassword } = useAuth();
  const [showLoginBtn, setShowLoginBtn] = useState(false);

  const onSubmit = (data: FieldValues) => {
    forgotPassword(data.email)
      .then(() => {
        Swal.fire({
          icon: "info",
          title: "Check your email...",
          text: "We have sent a password reset link to your email address.",
        }).then((result) => {
          if (result.isConfirmed) {
            window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
            setShowLoginBtn(true);
          }
        });
      })
      .catch((error) => {
        toast.error("Error: " + error.code);
      });
  };

  return (
    <section className="flex items-center h-screen pt-52 justify-center bg-slate-50">
      <div className="w-[90%] max-w-md rounded-lg bg-white px-8 py-12 shadow-md">
        <div className="pb-6 text-center">
          <h2 className="bg-gradient-to-r from-secondary to-indigo-700 bg-clip-text text-3xl font-semibold text-transparent">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-500">Enter your email to receive a reset link</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <input
                {...register("email", { required: true })}
                className={`h-12 w-full appearance-none rounded-md border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary ${
                  formError.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
                }`}
                placeholder="Email Address"
                id="email"
                type="email"
              />
              {formError.email && <p className="mt-2 text-sm text-red-500">Email is required</p>}
            </div>
            <button type="submit" className="h-12 w-full rounded-md bg-secondary text-base font-semibold text-white ">
              Send Reset Link
            </button>
          </div>
        </form>

        {showLoginBtn && (
          <>
            <hr className="my-6" />
            <Link href="/login">
              <p className="h-12 text-base font-semibold w-full border-2 flex items-center justify-center rounded-md border-primary text-primary hover:bg-primary hover:text-white transition-all">
                Back to Login
              </p>
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
