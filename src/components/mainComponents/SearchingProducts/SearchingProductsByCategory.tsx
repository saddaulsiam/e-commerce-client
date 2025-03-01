"use client";

import React, { useEffect, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { Pagination, ProductsCard } from "../../sharedComponents";
import SearchingProductsSidebarMenu from "./Searching.Products.Sidebar.Menu";
import SearchingProductsSidebar from "./Searching.Products.Sidebar";

const SearchingProductsByCategory = () => {
  const router = useRouter();
  const [sort, setSort] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSidebar, setShowSidebar] = useState(null);
  const [filterMinPrice, setFilterMinPrice] = useState(0);
  const [filterMaxPrice, setFilterMaxPrice] = useState(null);
  const [filterByBrands, setFilterByBrands] = useState([]);
  const [filterByColors, setFilterByColors] = useState([]);
  const [filteredProductsByPrice, setFilteredProductsByPrice] = useState([]);
  const [filteredProductsByColors, setFilteredProductsByColors] = useState([]);

  const { data: productsByCategory, isLoading } = useGetProductsByCategoryQuery({
    category: router.query.name,
    limit: 12,
    page: currentPage,
    sort: sort,
  });

  // Filter Product By filterMinPrice >= salePrice //
  useEffect(() => {
    if (filterMinPrice) {
      const filteredProduct = productsByCategory?.data?.products.filter(
        (product) => product.salePrice >= filterMinPrice
      );
      setFilteredProductsByPrice(filteredProduct);
    }
  }, [filterMinPrice, filterMaxPrice, productsByCategory?.data?.products]);

  // Filter Product By filterMaxPrice <= salePrice //
  useEffect(() => {
    if (filterMaxPrice) {
      const filteredProduct = productsByCategory?.data?.products.filter(
        (product) => product.salePrice <= filterMaxPrice
      );
      setFilteredProductsByPrice(filteredProduct);
    }
  }, [filterMaxPrice, filterMinPrice, productsByCategory?.data?.products]);

  // Filter the products compere => <= price //
  useEffect(() => {
    if (filterMinPrice?.length && filterMaxPrice?.length) {
      const filtered = productsByCategory?.data?.products.filter((product) => {
        return product.salePrice >= filterMinPrice && product.salePrice <= filterMaxPrice;
      });
      setFilteredProductsByPrice(filtered);
    }
  }, [filterMinPrice, filterMaxPrice, productsByCategory?.data?.products]);

  // Filter Product By Brands Name //
  const filteredProductsByBrands = [];

  productsByCategory?.data?.products?.forEach((product) => {
    if (filterByBrands.includes(product?.brand?.name)) {
      filteredProductsByBrands.push(product);
    }
  });

  // Filter Products By Colors Function //
  const filterProductsByColors = (products, colors) => {
    return products?.filter((product) => product.colors.some((color) => colors.includes(color)));
  };

  // Filter Products By Colors //
  useEffect(() => {
    if (filteredProductsByBrands?.length) {
      try {
        const filteredProducts = filterProductsByColors(filteredProductsByBrands, filterByColors);
        setFilteredProductsByColors(filteredProducts);
      } catch (error) {
        console.log(error);
      }
    } else {
      const filteredProducts = filterProductsByColors(productsByCategory?.data?.products, filterByColors);
      setFilteredProductsByColors(filteredProducts);
    }
  }, [productsByCategory?.data?.products, filterByColors]);

  // Pagination //
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render Products //
  const renderProducts = () => {
    let productsToRender = filteredProductsByPrice?.length
      ? filteredProductsByPrice
      : filteredProductsByColors?.length
      ? filteredProductsByColors
      : filteredProductsByBrands?.length
      ? filteredProductsByBrands
      : productsByCategory?.data?.products;

    return productsToRender?.map((product) => <ProductsCard key={product._id} product={product} />);
  };

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className="container mt-40 lg:mt-56">
          <div className="mb-10 flex-1 justify-between space-y-5 rounded-md bg-white p-5 md:flex">
            <div className="text-my-gray-200">
              <h2 className="text-base font-semibold text-gray-800">Searching for “ {router.query.name} ”</h2>
              <p className="text-sm">{productsByCategory?.data?.total} results found</p>
            </div>
            <div className="flex items-center space-x-3 text-sm text-my-gray-200 sm:space-x-4 sm:text-base">
              <p>Sort by:</p>
              <select
                name=""
                id=""
                className="h-10 rounded border border-gray-300 focus:border-secondary"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Best Match</option>
                <option value="salePrice">Price low to high</option>
                <option value="-salePrice">Price high to low</option>
              </select>
              <p
                className="cursor-pointer rounded-full p-2 text-lg hover:bg-slate-200 sm:text-xl lg:hidden"
                onClick={() => setShowSidebar(true)}
              >
                <TbAdjustmentsHorizontal />
              </p>
              <div className="flex items-center space-x-1">
                <p>View:</p>
                <p className="cursor-pointer rounded-full p-2 text-lg text-primary hover:bg-slate-200 sm:text-xl">
                  <BiCategory />
                </p>
                <p className="cursor-pointer rounded-full p-2 text-lg hover:bg-slate-200 sm:text-xl">
                  <GiHamburgerMenu />
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-5 px-3 xl:px-0">
            <div className="hidden sm:col-span-1 lg:block">
              <div className="rounded-md bg-white">
                <SearchingProductsSidebarMenu
                  // brands={brands.data}
                  products={productsByCategory?.data?.products}
                  setFilterByBrands={setFilterByBrands}
                  setFilterByColors={setFilterByColors}
                  setFilterMinPrice={setFilterMinPrice}
                  setFilterMaxPrice={setFilterMaxPrice}
                />
              </div>
            </div>
            <div className="col-span-5 lg:col-span-4">
              <div className="grid grid-cols-2 gap-x-2 gap-y-5 rounded-md sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4">
                {renderProducts()}
                {/* {categoriesProducts?.data?.products?.map((product, i) => (
                  <ProductCard key={i} product={product} />
                ))} */}
              </div>
              {/* <div className="mt-10 mb-20">
                <Pagination
                  currentPage={currentPage}
                  totalPages={data?.data?.page}
                  onPageChange={handlePageChange}
                />
              </div> */}
            </div>
          </div>
        </div>
      )}
      {showSidebar && (
        <SearchingProductsSidebar
          products={productsByCategory?.data?.products}
          setShowSidebar={setShowSidebar}
          setFilterMinPrice={setFilterMinPrice}
          setFilterMaxPrice={setFilterMaxPrice}
          setFilterByBrands={setFilterByBrands}
          setFilterByColors={setFilterByColors}
        />
      )}
    </>
  );
};

export default SearchingProductsByCategory;
