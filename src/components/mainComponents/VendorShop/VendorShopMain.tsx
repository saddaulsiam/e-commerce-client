"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetVendorByNameQuery } from "@/redux/features/vendor/vendorApi";
import { TVendor } from "@/types/common";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AiFillPhone, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { MdEmail, MdLocationPin } from "react-icons/md";
import VendorShopAllProducts from "./VendorShopAllProducts";
import VendorShopHomePage from "./VendorShopHomePage";

const VendorMain = () => {
  const path = useParams();
  const [search, setSearch] = useState("");
  const [selectTabs, setSelectTabs] = useState("Home Page");

  const { data } = useGetVendorByNameQuery(path.name);
  const vendor: TVendor = data?.data;
  return (
    <div className="bg-accent">
      <div className="container py-3">
        {/* Banner Section */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="relative">
            {/* Banner Image */}
            <Image
              height={200}
              width={1280}
              className="h-60 w-full object-cover"
              src={
                (vendor?.storeBanner as string) || "/banners/storeBanner.jpeg"
              }
              alt="Vendor Banner"
            />
            {/* Profile Image (Vendor Logo) */}
            <div className="absolute -bottom-12 left-10 h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-white">
              <Image
                height={112}
                width={112}
                className="h-full w-full object-cover"
                src={(vendor?.storeLogo as string) || "/logo/storeLogo.jpeg"}
                alt="Vendor Logo"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between p-6 pt-16 md:flex-row">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-semibold capitalize text-gray-800">
                {vendor?.storeName}
              </h2>
              <p className="flex items-center justify-center text-yellow-500 md:justify-start">
                {[...Array(4)].map((_, i) => (
                  <AiFillStar key={i} className="text-xl" />
                ))}
                <AiOutlineStar className="text-xl" />
                <span className="ml-2 text-gray-600">(50)</span>
              </p>
              <p className="flex items-center text-gray-600">
                <MdLocationPin className="mr-2 text-lg" />{" "}
                {vendor?.address.street +
                  ", " +
                  vendor?.address.area +
                  " " +
                  vendor?.address.city +
                  " " +
                  vendor?.address.region}
              </p>
              <p className="flex items-center lowercase text-gray-600">
                <MdEmail className="mr-2 text-lg" />{" "}
                {vendor?.storeName.split(" ")}@gmail.com
              </p>
              <p className="flex items-center text-gray-600">
                <AiFillPhone className="mr-2 text-lg" /> {vendor?.phoneNumber}
              </p>
            </div>
            <Button size="lg" className="mt-4 md:mt-0">
              Contact
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="my-5 flex flex-col justify-between rounded-lg bg-white p-4 shadow md:flex-row md:items-center">
          <div className="flex space-x-4">
            {["Home Page", "All Products"].map((tabs) => (
              <Button
                key={tabs}
                variant={selectTabs === tabs ? "default" : "outline"}
                onClick={() => setSelectTabs(tabs)}
              >
                {tabs}
              </Button>
            ))}
          </div>
          {selectTabs === "All Products" && (
            <div className="relative mt-5 sm:mt-0">
              <Input
                type="search"
                placeholder="Search products, brands, and categories..."
                className="h-10 w-full rounded-full pl-6 pr-12 text-sm shadow-sm md:w-80"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full"
              >
                <FiSearch size={4} />
              </Button>
            </div>
          )}
        </div>

        {/* Page Content */}
        {selectTabs === "Home Page" && <VendorShopHomePage />}
        {selectTabs === "All Products" && (
          <VendorShopAllProducts search={search} />
        )}
      </div>
    </div>
  );
};

export default VendorMain;
