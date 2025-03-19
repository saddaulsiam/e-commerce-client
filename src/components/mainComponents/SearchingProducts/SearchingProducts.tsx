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
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { BiHorizontalCenter } from "react-icons/bi";
import SearchingProductsSidebar from "./Searching.Products.Sidebar";

export type SortByType = "default" | "low" | "high";

const SearchingProducts = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const categoryQuery = searchParams.get("category");

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
      search: searchQuery || categoryQuery || undefined,
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
      searchQuery,
      categoryQuery,
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
    <div className="min-h-[70vh] bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Search Results for{" "}
            <span className="text-primary">
              &quot;{categoryQuery || searchQuery}&quot;
            </span>
          </h1>
          <p className="text-gray-600">
            {products?.data?.meta?.total.toLocaleString()} products found
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters Sidebar (Desktop) */}
          <div className="hidden min-h-[68vh] w-72 space-y-8 rounded-lg bg-white p-6 shadow-sm lg:block">
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

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between lg:justify-end">
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-gray-600">Sort by :</span>
                  <select
                    onChange={(e) =>
                      setSortBy(e.target.value as "default" | "low" | "high")
                    }
                    className="rounded-md border px-3 py-2 text-sm"
                  >
                    <option value="default">Newest Arrivals</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                  </select>
                </div>

                {/* Filters Sidebar (Mobile) */}
                <Sheet
                  open={mobileFiltersOpen}
                  onOpenChange={setMobileFiltersOpen}
                >
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="lg:hidden"
                      onClick={() => setMobileFiltersOpen(true)}
                    >
                      <BiHorizontalCenter className="mr-2 text-primary" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80 p-6">
                    <SheetTitle hidden>Filter Options</SheetTitle>
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

            {/* Products */}
            <div className="grid grid-cols-1 gap-x-3 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products?.data?.data?.map((product: TProduct) => (
                <ProductsCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {products?.data?.meta?.total > 8 && (
              <div className="mt-14">
                <Pagination
                  currentPage={currentPage}
                  totalPages={products?.data?.meta?.page}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchingProducts;
