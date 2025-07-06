import { Dispatch, SetStateAction } from "react";
import BrandFilter from "./Searching.Product.BrandFilter";
import ColorFilter from "./Searching.Product.ColorFilter";
import PriceFilter from "./Searching.Product.PriceFilter";
import StatusFilter from "./Searching.Product.StatusFilter";
import { useGetBrandsQuery } from "@/redux/features/brands/brandsApi";
import { TBrand, TProduct } from "@/types/common";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";

type TProps = {
  priceRange: number[];
  setPriceRange: Dispatch<SetStateAction<number[]>>;
  selectedColor: string | undefined;
  setSelectedColor: Dispatch<SetStateAction<string | undefined>>;
  selectedBrand: string | undefined;
  setSelectedBrand: Dispatch<SetStateAction<string | undefined>>;
  selectedStatus: string | undefined;
  setSelectedStatus: Dispatch<SetStateAction<string | undefined>>;
  onReset: () => void;
};

const SearchingProductsSidebar = ({
  priceRange,
  setPriceRange,
  selectedColor,
  setSelectedColor,
  selectedBrand,
  setSelectedBrand,
  selectedStatus,
  setSelectedStatus,
  onReset,
}: TProps) => {
  const { data: brands } = useGetBrandsQuery({ status: "active" });
  const { data: products } = useGetAllProductsQuery({ status: "in-stock" });

  const brandsName = brands?.data?.map((brand: TBrand) => brand?.name) || [];
  const colors = [
    ...new Set(
      products?.data?.data?.flatMap((product: TProduct) =>
        product.colors.map((color) => color),
      ),
    ),
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button
          onClick={onReset}
          className="hover:text-primary-dark text-sm text-primary"
        >
          Clear All
        </button>
      </div>

      <PriceFilter value={priceRange} onChange={setPriceRange} max={1000000} />

      <BrandFilter
        selectedBrand={selectedBrand}
        onBrandChange={setSelectedBrand}
        brands={brandsName}
      />

      <ColorFilter
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        colors={colors as string[]}
      />

      <StatusFilter
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statusOptions={["in-stock", "out-of-stock", "discontinued"]}
      />
    </div>
  );
};

export default SearchingProductsSidebar;
