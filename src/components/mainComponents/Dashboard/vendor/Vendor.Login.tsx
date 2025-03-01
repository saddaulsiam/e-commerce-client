import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// local
import cartBasket from "../../../../images/banners/cartBasket.png";
import { logo } from "../../../../../public/images/logo";
import useAuth from "../../../../hooks/useAuth";
import { Button } from "@/components/ui/button";

const VendorLogin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { signIn } = useAuth();

  const handleLogin = ({ email, password }) => {
    signIn(email, password)
      .then((res) => {
        if (res.user) {
          console.log(res.user);
          toast.success("Login successfully");
          router.push("/vendor/dashboard");
          reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="to-blue/90 h-screen w-screen bg-gradient-to-r from-primary from-10% via-violet-800/90 via-30% to-90%">
      <div className="h[10vh] bg-white">
        <div className="container">
          <Link href="/">
            <Image src={logo} width="100" height="" alt="" priority />
          </Link>
        </div>
      </div>
      <div className="container grid h-[90vh] grid-cols-1 py-20 md:grid-cols-2">
        <div className="flex h-full w-full flex-col items-start justify-center">
          <h1 className="text-4xl font-bold leading-tight text-white">
            Welcome to Siam Store <br />
            <span className="text-secondary">Seller Center</span>
          </h1>
          <Image src={cartBasket} alt="" priority />
        </div>
        <div className="flex h-full w-full items-center justify-end">
          <div className="max-w-lg rounded-2xl bg-white p-10">
            <h2 className="text-center text-3xl">Login an Account</h2>
            <p className="mt-3 text-center text-base text-my-gray-100">
              Welcome! Millions of Siam Store users are waiting to buy
              <br /> your product.
            </p>
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-3">
              <div>
                <label
                  className="text-sm font-semibold text-my-gray-100/80"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  className="h-10 w-full rounded border px-2 outline-1 focus:outline-primary"
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                />
                {errors?.email && (
                  <p className="text-secondary">Email is required</p>
                )}
              </div>
              <div>
                <label
                  className="text-sm font-semibold text-my-gray-100/80"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  className="h-10 w-full rounded border px-2 outline-1 focus:outline-primary"
                  placeholder="Enter your password"
                  type="password"
                  id="password"
                />
                {errors?.email && (
                  <p className="text-secondary">Password is required</p>
                )}
              </div>
              <Button
                type="submit"
                className="btn mt-10 w-full border-0 bg-secondary hover:bg-red-600"
              >
                Login
              </Button>
            </form>
            <div className="divider text-xs">OR</div>
            <Link href="/vendor/register">
              <Button className="h-10 w-full rounded-md border border-secondary text-base text-my-gray-200 transition duration-300 ease-in-out hover:bg-secondary hover:text-white">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
