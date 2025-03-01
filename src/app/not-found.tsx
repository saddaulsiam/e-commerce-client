import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
      <div className="mb-8 text-center">
        <Image
          src="/not-found"
          width={350}
          height={350}
          alt="Page Not Found"
          priority
        />
      </div>
      <h1 className="text-4xl font-bold text-gray-800">Oops! Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-600">
        Looks like the page you&apos;re looking for doesn&apos;t exist. But
        don’t worry, we can help you find your way back!
      </p>
      <div className="mt-8 flex space-x-4">
        <Link href="/">
          <Button>Go to Home Page</Button>
        </Link>
        <Link href="/shop">
          <Button className="bg-green-600 hover:bg-green-500">Shop Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
