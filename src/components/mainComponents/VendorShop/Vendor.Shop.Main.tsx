import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { AiFillPhone, AiFillStar, AiOutlineStar } from "react-icons/ai";

// local
import VendorShopProfile from "./Vendor.Shop.Profile";
import VendorShopHomePage from "./Vendor.Shop.HomePage";
import VendorShopAllProducts from "./Vendor.Shop.AllProducts";
import { SearchingProductsSidebar } from "../SearchingProducts";
import { useGetVendorByNameQuery } from "../../../redux/features/auth/vendor/venAuthApi";

const VendorMain = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [showSidebar, setShowSidebar] = useState(null);
  const [selectCategory, setSelectCategory] = useState("Home Page");

  const { data: store } = useGetVendorByNameQuery({ name: router.query.name });
  return (
    <>
      <div className="mt-[7.7rem] lg:mt-44">
        <div className="container py-10">
          {/* Banner */}
          <div className="rounded-lg bg-white">
            <div className="relative">
              {/* Banner */}
              <div>
                <Image
                  height="250"
                  width="1280"
                  className="rounded-t-lg object-cover object-center"
                  src={
                    store?.data?.coverImage ||
                    "https://images.pexels.com/photos/1827234/pexels-photo-1827234.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  }
                  alt=""
                  priority
                />
              </div>
              {/* Logo */}
              <div className="absolute -bottom-10 left-10 h-24 w-24 rounded-full border-4 border-white">
                <Image
                  layout="fill"
                  className="rounded-full"
                  src={
                    store?.data?.profileImage ||
                    "https://images.pexels.com/photos/176837/pexels-photo-176837.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  }
                  alt=""
                  priority
                />
              </div>
            </div>
            <div className="mx-3 flex justify-between pt-10 pb-5 md:pt-3">
              <div className="space-y-1 text-base text-my-gray-100 md:ml-32 lg:ml-40 ">
                <h2 className="text-xl font-semibold capitalize text-my-gray-200">
                  {store?.data?.storeName.split("-").join(" ")}
                </h2>
                <p className="flex items-center text-yellow-500">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                  <span className="ml-2 text-black">(50)</span>
                </p>
                <p>
                  <MdLocationPin className="inline" /> {store?.data?.location || "Address not provided"}
                </p>
                <p>
                  <MdEmail className="inline" /> {store?.data?.email}
                </p>
                <p>
                  <AiFillPhone className="inline" /> {store?.data?.phoneNumber}
                </p>
              </div>
              <div className="flex items-center md:mr-10">
                <button className="button">Contact</button>
              </div>
            </div>
          </div>
          {/* filter */}
          <div className="my-3 flex-1 justify-between space-y-5 bg-white p-5 sm:flex">
            <div className="tabs">
              {["Home Page", "All Products", "Profile"].map((category) => (
                <a
                  key={category}
                  onClick={() => setSelectCategory(category)}
                  className={`tab tab-lifted text-base ${selectCategory === category && "tab-active"}`}
                >
                  {category}
                </a>
              ))}
            </div>
            <div className="">
              {selectCategory === "All Products" && (
                <input
                  type="text"
                  placeholder="Search in store"
                  className="input h-10 w-full border border-gray-300"
                  onChange={(e) => setSearch(e.target.value)}
                />
              )}
            </div>
          </div>
          {/* Filter and products */}
          {selectCategory === "Home Page" && <VendorShopHomePage />}
          {selectCategory === "All Products" && (
            <VendorShopAllProducts search={search} setShowSidebar={setShowSidebar} />
          )}
          {selectCategory === "Profile" && <VendorShopProfile />}
        </div>
      </div>
      {showSidebar && <SearchingProductsSidebar setShowSidebar={setShowSidebar} />}
    </>
  );
};

export default VendorMain;
