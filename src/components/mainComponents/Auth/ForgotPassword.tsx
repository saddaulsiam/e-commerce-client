import React from "react";
import Link from "next/link";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm();
  const [showLoginBtn, setShowLoginBtn] = React.useState(false);

  const onSubmit = (data) => {
    forgotPassword(data.email)
      .then(() => {
        Swal.fire({
          icon: "info",
          title: "Check your email...",
        }).then((result) => {
          if (result.isConfirmed) {
            window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
            setShowLoginBtn(true);
          }
        });
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };
  return (
    <section className="flex h-screen items-center justify-center bg-slate-100">
      <div className="w-[500px] rounded-lg bg-white px-16 py-10 shadow-sm">
        <div className="pb-10 text-center">
          <h2 className="bg-gradient-to-r from-secondary to-indigo-700 bg-clip-text text-3xl font-semibold text-transparent">
            Forgot Password
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <div>
              <input
                {...register("email", { required: true })}
                className="h-12 w-full appearance-none rounded-md border-my-gray-100 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border focus:border-primary focus:outline-none"
                placeholder="Email"
                id="email"
                type="text"
              />
              {formError.email && <p className="text-sm text-secondary">Email is required</p>}
            </div>
            <button
              type="submit"
              className="h-12 w-full rounded-md bg-secondary/90 from-secondary to-my-gray-200 text-base font-semibold text-white transition-all ease-in hover:bg-gradient-to-r"
            >
              Forgot
            </button>
          </div>
        </form>

        {showLoginBtn && (
          <>
            <hr className="my-5 " />
            <Link href={"/login"}>
              <p className="flex h-10 w-full items-center justify-center rounded-md border border-primary text-base text-primary hover:border-none hover:bg-primary hover:text-white ">
                Login
              </p>
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
