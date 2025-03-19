import { SwiperCategoriesCard } from "@/components/sharedComponents";
import { cProducts } from "@/data/products";
import { BiCategory } from "react-icons/bi";

const TopCategories = () => {
  return (
    <section className="bg-accent">
      <div className="container px-2 pb-16 pt-10">
        <h2 className="pb-5 text-2xl font-bold italic text-primary">
          <BiCategory className="mr-1 inline text-primary" />
          Top Categories
        </h2>

        <SwiperCategoriesCard cProducts={cProducts} />
      </div>
    </section>
  );
};

export default TopCategories;
