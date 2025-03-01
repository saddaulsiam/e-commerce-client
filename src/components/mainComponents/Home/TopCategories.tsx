import { SwiperCategoriesCard } from "@/components/sharedComponents";
import { cProducts } from "@/data/products";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";

const TopCategories = () => {
  return (
    <section className="bg-accent py-10">
      <div className="container">
        <div className="flex justify-between">
          <h2 className="pb-5 text-2xl font-bold italic text-primary">
            <BiCategory className="mr-1 inline text-primary" />
            Top Categories
          </h2>
          <Link href="/categories" className="text-sm text-my-gray-100">
            View all <AiOutlineArrowRight className="inline" />
          </Link>
        </div>
        <SwiperCategoriesCard cProducts={cProducts} />
      </div>
    </section>
  );
};

export default TopCategories;
