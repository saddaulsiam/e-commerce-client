"use client";

import BrandsSkeleton from "@/components/sharedComponents/loader/BrandsSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useGetBrandsQuery } from "@/redux/features/brands/brandsApi";
import { TBrand } from "@/types/common";
import Image from "next/image";
import { useState } from "react";

const AllBrands = () => {
  const { data: brandsData, isLoading, isError } = useGetBrandsQuery(undefined);
  const [search, setSearch] = useState("");

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="text-red-500">Error loading brands.</span>
      </div>
    );
  }

  // Filter brands based on the search query (case-insensitive)
  const filteredBrands = brandsData?.data.filter((brand: TBrand) =>
    brand.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container py-5">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">All Brands</h2>
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search brands..."
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      {isLoading ? (
        <BrandsSkeleton />
      ) : filteredBrands && filteredBrands.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {filteredBrands.map((brand: TBrand) => (
            <Card
              key={brand._id}
              className="shadow transition-shadow duration-300 hover:shadow-lg"
            >
              <CardContent className="flex flex-col items-center p-6">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={60}
                  height={30}
                  className="mb-4 object-contain"
                />
                <h3 className="mb-2 text-xl font-semibold">{brand.name}</h3>
                <p className="text-center text-gray-600">
                  {brand.description || "No description available."}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No brands available</p>
      )}
    </div>
  );
};

export default AllBrands;
