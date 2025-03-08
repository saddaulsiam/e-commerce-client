import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { BsFillCameraFill } from "react-icons/bs";

const VendorAccountSettings = () => {
  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h2 className="my-5 text-2xl font-semibold text-my-gray-200">
          Account Settings
        </h2>
      </div>

      <div className="rounded-md bg-white">
        {/* Banner Section */}
        <div className="p-5">
          <div className="relative h-80 w-full">
            <Image
              alt="Store Banner"
              layout="fill"
              className="rounded-md object-cover object-center"
              src="https://images.pexels.com/photos/1827234/pexels-photo-1827234.jpeg?auto=compress&cs=tinysrgb&w=1600"
              priority
            />
            <Label
              htmlFor="banner-change"
              className="absolute right-5 top-5 z-10 cursor-pointer rounded-full bg-white p-2 text-primary"
            >
              <BsFillCameraFill />
            </Label>
            <Input
              type="file"
              name="banner-change"
              id="banner-change"
              className="hidden"
            />
          </div>

          {/* Logo Section */}
          <div className="relative">
            <div className="absolute bottom-3 left-3 h-20 w-20">
              <Image
                layout="fill"
                className="rounded-full"
                src="https://images.pexels.com/photos/176837/pexels-photo-176837.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <Label
                htmlFor="logo-change"
                className="absolute -right-2 bottom-3 z-10 cursor-pointer rounded-full bg-gray-100 p-2 text-primary"
              >
                <BsFillCameraFill />
              </Label>
              <Input
                type="file"
                name="logo-change"
                id="logo-change"
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Input fields */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 p-5 pt-2 sm:grid-cols-2">
          <div className="flex flex-col">
            <Label htmlFor="productName" className="pb-1 text-my-gray-200">
              Regular Price
            </Label>
            <Input
              type="number"
              name="productName"
              id="productName"
              placeholder="Product Name"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="productName" className="pb-1 text-my-gray-200">
              Sale Price
            </Label>
            <Input
              type="number"
              name="productName"
              id="productName"
              placeholder="Product Name"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="productName" className="pb-1 text-my-gray-200">
              Regular Price
            </Label>
            <Input
              type="number"
              name="productName"
              id="productName"
              placeholder="Product Name"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="productName" className="pb-1 text-my-gray-200">
              Sale Price
            </Label>
            <Input
              type="number"
              name="productName"
              id="productName"
              placeholder="Product Name"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="productName" className="pb-1 text-my-gray-200">
              Regular Price
            </Label>
            <Input
              type="number"
              name="productName"
              id="productName"
              placeholder="Product Name"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="productName" className="pb-1 text-my-gray-200">
              Sale Price
            </Label>
            <Input
              type="number"
              name="productName"
              id="productName"
              placeholder="Product Name"
            />
          </div>
        </div>

        {/* save */}
        <Button className="m-5 border-none bg-primary hover:bg-red-600">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default VendorAccountSettings;
