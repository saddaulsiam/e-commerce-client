"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { BsFillCameraFill } from "react-icons/bs";

const VendorUpdateAccountSettings = () => {
  const [banner, setBanner] = useState<string>(
    "https://images.pexels.com/photos/1827234/pexels-photo-1827234.jpeg?auto=compress&cs=tinysrgb&w=1600",
  );
  const [logo, setLogo] = useState<string>(
    "https://images.pexels.com/photos/176837/pexels-photo-176837.jpeg?auto=compress&cs=tinysrgb&w=1600",
  );

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setBanner(URL.createObjectURL(file));
    }
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setLogo(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h2 className="pt-3 text-2xl font-semibold text-gray-800">
        Account Settings
      </h2>

      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        {/* Banner Section */}
        <div className="relative h-72">
          <Image
            alt="Store Banner"
            layout="fill"
            className="object-cover object-center"
            src={banner}
            priority
          />
          <Label
            htmlFor="banner-change"
            className="absolute right-4 top-4 flex cursor-pointer items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-medium text-primary shadow hover:bg-gray-100"
          >
            <BsFillCameraFill />
            Change Banner
          </Label>
          <Input
            type="file"
            name="banner-change"
            id="banner-change"
            className="hidden"
            accept="image/*"
            onChange={handleBannerChange}
          />
        </div>

        {/* Logo Section */}
        <div className="relative -mt-12 flex justify-center">
          <div className="relative h-24 w-24">
            <Image
              layout="fill"
              className="rounded-full border-4 border-white shadow-md"
              src={logo}
              alt="Store Logo"
            />
            <Label
              htmlFor="logo-change"
              className="absolute -right-2 bottom-2 flex cursor-pointer items-center justify-center rounded-full bg-gray-100 p-2 text-primary shadow-md hover:bg-gray-200"
            >
              <BsFillCameraFill className="h-4 w-4" />
            </Label>
            <Input
              type="file"
              name="logo-change"
              id="logo-change"
              className="hidden"
              accept="image/*"
              onChange={handleLogoChange}
            />
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
          <div className="flex flex-col">
            <Label htmlFor="storeName" className="pb-1 text-gray-600">
              Store Name
            </Label>
            <Input
              type="text"
              name="storeName"
              id="storeName"
              placeholder="Enter your store name"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="email" className="pb-1 text-gray-600">
              Email Address
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="phone" className="pb-1 text-gray-600">
              Phone Number
            </Label>
            <Input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="address" className="pb-1 text-gray-600">
              Store Address
            </Label>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="Enter your store address"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="border-t bg-gray-50 p-6">
          <Button className="hover:bg-primary-dark w-full bg-primary">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VendorUpdateAccountSettings;
