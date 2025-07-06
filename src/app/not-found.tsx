"use client";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import Link from "next/link";
import notFoundAnimation from "../../public/animation/not-found.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
};
const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="mb-8 h-72 w-72 sm:h-80 sm:w-80">
        <Lottie
          animationData={notFoundAnimation}
          loop
          className="pointer-events-none"
        />
      </div>
      <h1 className="text-center text-4xl font-extrabold text-gray-700 sm:text-5xl">
        Oops! Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-center text-base text-gray-600 sm:text-lg">
        Looks like the page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link href="/">
          <Button variant="default" className="w-full sm:w-auto">
            Go to Home
          </Button>
        </Link>
        <Link href="/shop">
          <Button className="w-full bg-green-500 hover:bg-green-600 sm:w-auto">
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
