"use client";

import { Pagination, ProductsCard } from "@/components/sharedComponents";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/common";
import { useCallback, useMemo, useState } from "react";
import { BiHorizontalCenter } from "react-icons/bi";
import { SearchingProductsSidebar } from "../SearchingProducts";
import { SortByType } from "../SearchingProducts/SearchingProducts";

const VendorShopAllProducts = ({ search }: { search: string }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<SortByType>("default");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Memoized API query parameters
  const queryParams = useMemo(
    () => ({
      search,
      sortBy: sortBy === "default" ? "createdAt" : "price",
      sortOrder: sortBy === "high" ? "desc" : "asc",
      limit: 8,
      page: currentPage,
      brand: selectedBrand || undefined,
      color: selectedColor || undefined,
      status: selectedStatus || undefined,
      minPrice: priceRange[0] || undefined,
      maxPrice: priceRange[1] || undefined,
    }),
    [
      search,
      sortBy,
      currentPage,
      selectedBrand,
      selectedColor,
      selectedStatus,
      priceRange,
    ],
  );

  const { data: products } = useGetAllProductsQuery(queryParams);

  // Memoized filter reset function
  const handleFilterReset = useCallback(() => {
    setPriceRange([0, 1000000]);
    setSelectedColor(undefined);
    setSelectedBrand(undefined);
    setSelectedStatus(undefined);
  }, []);

  return (
    <div className="grid grid-cols-5 gap-5 px-3 xl:px-0">
      {/* Desktop Sidebar */}
      <div className="hidden lg:col-span-1 lg:block">
        <div className="h-full rounded-lg bg-white p-6 shadow-sm">
          <SearchingProductsSidebar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            onReset={handleFilterReset}
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="col-span-5 lg:col-span-4">
        {/* Toolbar */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between lg:justify-end">
            {/* Sorting Dropdown */}
            <div className="flex items-center space-x-1">
              <label htmlFor="sortBy" className="text-sm text-gray-600">
                Sort by:
              </label>
              <select
                id="sortBy"
                onChange={(e) => setSortBy(e.target.value as SortByType)}
                className="rounded-md border px-3 py-2 text-sm"
                aria-label="Sort products by"
                value={sortBy}
              >
                <option value="default">Newest Arrivals</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>

            {/* Mobile Filter Button */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <BiHorizontalCenter className="mr-2 text-primary" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-6">
                <SheetTitle hidden>Filter Options</SheetTitle>{" "}
                <div className="pb-10" />
                <SearchingProductsSidebar
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  selectedBrand={selectedBrand}
                  setSelectedBrand={setSelectedBrand}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                  onReset={handleFilterReset}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/*  Product Grid  */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-5 rounded-md pb-5 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
          {products?.data?.data?.length > 0 ? (
            products.data.data.map((product: TProduct) => (
              <ProductsCard key={product._id} product={product} />
            ))
          ) : (
            <div className="pl-2 text-2xl text-gray-500">
              Ops! Product not found
            </div>
          )}
        </div>

        {/* Pagination */}
        {products?.data?.meta?.total > 8 && (
          <div className="py-10">
            <Pagination
              currentPage={currentPage}
              totalPages={products?.data?.meta?.page}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorShopAllProducts;
