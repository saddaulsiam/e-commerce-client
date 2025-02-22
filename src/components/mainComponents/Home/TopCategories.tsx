import { AiOutlineArrowRight } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { cProducts } from "../../../data/products";

import { SwiperCatagoriesCard } from "../../sharedComponents";

const TopCategories = () => {
  return (
    <section className="bg-[#e6ebf1] px-3 pb-16 xl:px-0">
      <div className="container">
        <div className="flex justify-between">
          <h2 className="pb-5 text-2xl font-bold italic text-primary">
            <BiCategory className="mr-1 inline text-secondary" />
            Top Categories
          </h2>
          <a href="" className="text-sm text-my-gray-100">
            View all <AiOutlineArrowRight className="inline" />
          </a>
        </div>
        <SwiperCatagoriesCard cProducts={cProducts} />
      </div>
    </section>
  );
};

export default TopCategories;
