import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// local
import { useDeleteVendorMutation, useRegisterVendorMutation } from "../../../../redux/features/auth/vendorApi";
import cartBasket from "../../../../images/banners/cartBasket.png";
import useAuth from "../../../../hooks/useAuth";
import { logo } from "../../../../../public/images/logo";

const VendorRegister = () => {
  // hooks
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors: formError },
  } = useForm();
  const router = useRouter();
  const { createUser, signIn } = useAuth();

  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Rtk query and firebase auth
  const [registerVendor] = useRegisterVendorMutation();
  const [deleteVendor] = useDeleteVendorMutation();

  const handleLogin = () => {
    signIn(email, password)
      .then((res) => {
        if (res.user) {
          toast.success("Login successfully");
          router.push("/vendor/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegister = (data) => {
    // store data on database
    registerVendor(data).then((res) => {
      const dbVendor = res.data?.data;

      if (res.error?.status === 500) {
        // check store name exists
        toast.error(res.error.data?.message);
      } else if (res.error?.status === 400) {
        // check phone number not valid
        toast.error(res.error.data?.error.split(":")[2]);
      } else {
        // creating user on firebase
        createUser(data.email, data.password)
          .then((res) => {
            if (res.user) {
              reset();
              toast.success("Your seller account create successfully");
              router.push("/vendor/dashboard");
            }
          })
          .catch((error) => {
            toast.error(error.code);
            deleteVendor(dbVendor?._id);
          });
      }
    });
  };
  return (
    <div className="from-10% via-30% to-90% to-blue/90 h-screen w-screen bg-gradient-to-r from-primary via-violet-800/90 ">
      <div className=" bg-white shadow-lg">
        <div className="container grid grid-cols-2">
          <div>
            <Link href="/">
              <Image src={logo} width="100" height="" alt="" priority />
            </Link>
          </div>
          <div className="flex items-center space-x-5">
            <div>
              <label htmlFor="">Email</label> <br />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Enter your email "
                className="h-8 rounded border border-my-gray-200 px-2"
              />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <br />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                placeholder="Enter your password "
                className="h-8 rounded border border-my-gray-200 px-2"
              />
            </div>
            <button onClick={handleLogin} className="mt-4 rounded-md bg-secondary py-2 px-8 text-white">
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="container grid grid-cols-1 py-20 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold leading-tight text-white">
            Bangladesh&apos;s #1 <br />
            <span className="text-secondary"> Marketplace</span>
          </h1>
          <p className="text-whit mt-10 text-xl  font-thin text-my-gray-100">
            Create a seller account in 1 minutes and reach millions of customers today!
          </p>
          <Image src={cartBasket} alt="" priority />
        </div>
        <div className=" flex h-full w-full items-center justify-end">
          <div className=" max-w-lg rounded-2xl bg-white p-10">
            <h2 className="text-center text-3xl">Create an Account</h2>
            <p className="mt-3 text-center text-base text-my-gray-100">
              Welcome! Millions of Siam Store users are waiting to buy
              <br /> your product.
            </p>
            <form onSubmit={handleSubmit(handleRegister)}>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-semibold text-my-gray-100/80" htmlFor="email">
                    Email
                  </label>
                  <input
                    {...register("email", { required: true })}
                    className="h-10 w-full rounded border px-2 outline-1 focus:outline-primary"
                    placeholder="Enter your email"
                    type="email"
                    id="email"
                  />
                  {formError?.email && <p className="text-secondary">Email is required</p>}
                </div>
                <div>
                  <label className="text-sm font-semibold text-my-gray-100/80" htmlFor="store-name">
                    Store Name
                  </label>
                  <input
                    {...register("storeName", { required: true, minLength: 3 })}
                    className="h-10 w-full rounded border px-2 outline-1 focus:outline-primary"
                    placeholder="Enter your Store Name"
                    type="text"
                    id="store-name"
                  />
                  {formError?.storeName?.type === "required" && <p className="text-secondary">Name is required</p>}
                  {formError?.storeName?.type === "minLength" && (
                    <p className="text-secondary">Store name must be 4 characters</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-my-gray-100/80" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    {...register("phoneNumber", { required: true })}
                    className="h-10 w-full rounded border px-2 outline-1 focus:outline-primary"
                    placeholder="Enter your phone"
                    type="number"
                    id="phoneNumber"
                  />
                  {formError?.phoneNumber?.type === "required" && (
                    <p className="text-secondary">Please enter a valid phone number</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-my-gray-200" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="block h-10 w-full rounded-md border px-3 text-sm"
                    placeholder="minimum 6 character 1 number 1 uppercase 1 symbol"
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    })}
                  />
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
                <div>
                  <label className="text-sm text-my-gray-200" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    autoComplete="off"
                    {...register("confirmPassword", {
                      validate: (value) => {
                        const { password } = getValues();
                        return password === value;
                      },
                    })}
                    className="block h-10 w-full rounded-md border px-3 text-sm"
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                  />
                  {formError?.confirmPassword?.type === "validate" && (
                    <p className="text-secondary">Passwords don&apos;t match!</p>
                  )}
                </div>
              </div>
              <button
                // type="submit"
                className="btn mt-10 w-full border-0 bg-secondary hover:bg-red-600"
              >
                Create Account
              </button>
              <div className="divider text-xs">OR</div>
              <Link href="/vendor/login">
                <button className="h-10 w-full rounded-md border border-secondary text-base text-my-gray-200 transition duration-300 ease-in-out hover:bg-secondary hover:text-white">
                  Login
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
