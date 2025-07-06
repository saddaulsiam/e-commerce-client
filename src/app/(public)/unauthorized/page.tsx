import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "You are Unauthorized",
};
export default function UnauthorizedPage() {
  return (
    <div className="flex h-[calc(100vh-19.5vh)] items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm md:p-12">
        <div className="mb-6 flex justify-center">
          <ShieldAlert className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Access Denied
        </h1>
        <p className="mb-6 text-gray-700">
          You don&apos;t have the required permissions to view this page. Please
          check your account role or contact support if you believe this is a
          mistake.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
