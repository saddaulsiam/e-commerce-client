"use client";
import { cProducts } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";

const AllCategories = () => {
  // const { data: categories } = useGetCategoriesQuery();
  return (
    <section className="bg-accent py-10">
      <div className="container">
        <div className="flex justify-between">
          <h2 className="pb-5 text-2xl font-bold italic text-primary">
            <BiCategory className="mr-1 inline text-primary" />
            All Catagories
          </h2>
          <a href="" className="text-sm text-my-gray-100">
            View all <AiOutlineArrowRight className="inline" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {cProducts.map(({ name, href, img }, i) => (
            <Link href={`/${href}`} key={i}>
              <div className="flex h-20 cursor-pointer items-center justify-center rounded-md border bg-white p-2 hover:shadow-lg">
                <h4 className="font-semibold text-gray-600">{name}</h4>
                <span className="ml-2">
                  <Image alt={name} src={img} width={25} height={25} priority />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllCategories;
