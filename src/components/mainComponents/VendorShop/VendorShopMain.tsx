"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { AiFillPhone, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdEmail, MdLocationPin } from "react-icons/md";
import VendorShopAllProducts from "./VendorShopAllProducts";
import VendorShopHomePage from "./VendorShopHomePage";
import VendorShopProfile from "./VendorShopProfile";

const VendorMain = () => {
  const [search, setSearch] = useState("");
  const [selectCategory, setSelectCategory] = useState("HomePage");
  const [showSideBar, setShowSidebar] = useState<boolean>(false);

  return (
    <div className="container mx-auto px-4 py-6 md:px-10">
      {/* Banner */}
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div className="relative">
          {/* Banner Image */}
          <Image
            height={200}
            width={1280}
            className="h-52 w-full object-cover"
            src="https://images.pexels.com/photos/1827234/pexels-photo-1827234.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Vendor Banner"
          />
          {/* Profile Image */}
          <div className="absolute -bottom-10 left-10 h-24 w-24 overflow-hidden rounded-full border-4 border-white">
            <Image
              height={96}
              width={96}
              className="object-cover"
              src="https://images.pexels.com/photos/176837/pexels-photo-176837.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Vendor Logo"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between p-6 pt-12 md:flex-row">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-semibold capitalize text-gray-800">
              Vendor Name
            </h2>
            <p className="flex items-center justify-center text-yellow-500 md:justify-start">
              {[...Array(4)].map((_, i) => (
                <AiFillStar key={i} className="text-xl" />
              ))}
              <AiOutlineStar className="text-xl" />
              <span className="ml-2 text-gray-600">(50)</span>
            </p>
            <p className="flex items-center text-gray-600">
              <MdLocationPin className="mr-2 text-lg" /> Address not provided
            </p>
            <p className="flex items-center text-gray-600">
              <MdEmail className="mr-2 text-lg" /> vendor@email.com
            </p>
            <p className="flex items-center text-gray-600">
              <AiFillPhone className="mr-2 text-lg" /> +123 456 7890
            </p>
          </div>
          <Button className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 md:mt-0">
            Contact
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="my-5 flex flex-col items-center justify-between rounded-lg bg-white p-4 shadow-md md:flex-row">
        <div className="flex space-x-4">
          {["HomePage", "AllProducts", "Profile"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectCategory(category)}
              className={`rounded-md px-4 py-2 font-medium transition-all ${
                selectCategory === category
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {selectCategory === "All Products" && (
          <input
            type="text"
            placeholder="Search in store..."
            className="mt-3 w-full rounded-md border border-gray-300 px-3 py-2 md:mt-0 md:w-64"
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </div>

      {/* Page Content */}
      <div>
        {selectCategory === "HomePage" && <VendorShopHomePage />}
        {selectCategory === "AllProducts" && (
          <VendorShopAllProducts
            setShowSidebar={setShowSidebar}
            search={search}
          />
        )}
        {selectCategory === "Profile" && <VendorShopProfile />}
      </div>
    </div>
  );
};

export default VendorMain;
