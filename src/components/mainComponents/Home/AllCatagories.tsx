"use client";
import Link from "next/link";
import Image from "next/image";
import { BiCategory } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useGetCategoriesQuery } from "../../../redux/features/categories/categoriesApi";

const AllCatagories = () => {
  const { data: categories } = useGetCategoriesQuery();
  return (
    <section className="bg-[#e6ebf1] px-3 pb-16 xl:px-0">
      <div className="container">
        <div className="flex justify-between">
          <h2 className="pb-5 text-2xl font-bold italic text-primary">
            <BiCategory className="mr-1 inline text-secondary" />
            All Catagories
          </h2>
          <a href="" className="text-sm text-my-gray-100">
            View all <AiOutlineArrowRight className="inline" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {categories?.data.map(({ name, icon }, i) => (
            <Link href={`/product?category=${name.toLowerCase()}`} key={i}>
                <div className="flex h-20 cursor-pointer items-center justify-center rounded-md border bg-white p-2  hover:shadow-lg">
                  <h4 className="font-semibold text-gray-600">{name}</h4>
                  <span className="ml-2">
                    <Image
                      alt={name}
                      src={icon}
                      width={25}
                      height={25}
                      priority
                    />
                  </span>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllCatagories;
