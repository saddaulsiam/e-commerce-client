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
          <button className="transform rounded-lg bg-orange-600 px-6 py-3 text-lg text-white shadow-lg transition hover:scale-105 hover:bg-orange-500 focus:outline-none">
            Go to Home Page
          </button>
        </Link>
        <Link href="/shop">
          <button className="transform rounded-lg bg-green-600 px-6 py-3 text-lg text-white shadow-lg transition hover:scale-105 hover:bg-green-500 focus:outline-none">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
