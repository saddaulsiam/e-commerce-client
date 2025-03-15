"use client";

import { Pagination, ProductsCard } from "@/components/sharedComponents";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/common";
import { useState } from "react";
import { BiHorizontalCenter } from "react-icons/bi";
import { RiGridFill, RiListCheck } from "react-icons/ri";
import SearchingProductsSidebar from "./Searching.Products.Sidebar";

const SearchingProducts = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"default" | "low" | "high">("default");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined,
  );
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(
    undefined,
  );
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    undefined,
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { data: products } = useGetAllProductsQuery({
    sortBy: sortBy === "default" ? "createdAt" : "price",
    sortOrder: sortBy === "high" ? "desc" : "asc",
    limit: 50,
    page: currentPage,
    brand: selectedBrand || undefined,
    color: selectedColor || undefined,
    status: selectedStatus || undefined,
    minPrice: priceRange[0] || undefined,
    maxPrice: priceRange[1] || undefined,
  });

  const handleFilterReset = () => {
    setPriceRange([0, 1000000]);
    setSelectedColor(undefined);
    setSelectedBrand(undefined);
    setSelectedStatus(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Search Results for &quot;Product&quot;
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {products?.data?.meta?.total.toLocaleString()} results found
            </p>
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <BiHorizontalCenter className="mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters Sidebar (Mobile) */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden">
              <div className="absolute right-0 top-0 h-full w-80 overflow-y-auto bg-white p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
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
          )}

          {/* Filters Sidebar (Desktop) */}
          <div className="hidden w-72 space-y-8 lg:block">
            <div className="rounded-lg bg-white p-6 shadow-sm">
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
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Sort by:</span>
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
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    onClick={() => setViewMode("grid")}
                  >
                    <RiGridFill className="text-lg" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    onClick={() => setViewMode("list")}
                  >
                    <RiListCheck className="text-lg" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-x-3 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products?.data?.data?.map((product: TProduct) => (
                  <ProductsCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {products?.data?.data?.map((product: TProduct) => (
                  <ProductsCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {products?.data?.meta?.total > 20 && (
              <div className="mt-12">
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
