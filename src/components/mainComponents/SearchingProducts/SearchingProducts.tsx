"use client";

import React, { useEffect, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { useRouter } from "next/navigation";

// local
import { Pagination, ProductsCard } from "../../sharedComponents";
import SearchingProductsSidebarMenu from "./Searching.Products.Sidebar.Menu";
import SearchingProductsSidebar from "./Searching.Products.Sidebar";
import { useGetProductsBySearchMutation } from "../../../redux/features/products/productsApi";
import { useGetBrandsQuery } from "../../../redux/features/brands/brandsApi";

const SearchingProducts = () => {
  const router = useRouter();

  const [sort, setSort] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSidebar, setShowSidebar] = useState(null);

  const [filterMinPrice, setFilterMinPrice] = useState(0);
  const [filterMaxPrice, setFilterMaxPrice] = useState(null);
  const [filterByBrands, setFilterByBrands] = useState([]);
  const [filterByColors, setFilterByColors] = useState([]);
  const [filteredByStatus, setFilteredByStatus] = useState([]);
  const [filteredProductsByPrice, setFilteredProductsByPrice] = useState([]);
  const [filteredProductsByColors, setFilteredProductsByColors] = useState([]);

  // console.log(filteredByStatus);

  const [getData, { data: productsData, isLoading }] = useGetProductsBySearchMutation();

  useEffect(() => {
    if (router.query.search) {
      getData({
        limit: 12,
        page: currentPage,
        sort: sort,
        search: router.query.search,
      });
    } else if (router.query.category) {
      getData({
        limit: 12,
        page: currentPage,
        sort: sort,
        category: router.query.category,
      });
    }
  }, [currentPage, sort, getData, router.query.category, router.query.search]);

  // Get brands //
  const { data: brands } = useGetBrandsQuery();

  // Filter Product By filterMinPrice >= Price //
  useEffect(() => {
    if (filterMinPrice) {
      const filteredProduct = productsData?.data.products.filter((product) => product.price >= filterMinPrice);
      setFilteredProductsByPrice(filteredProduct);
    }
  }, [filterMinPrice, filterMaxPrice, productsData?.data.products]);

  // Filter Product By filterMaxPrice <= salePrice //
  useEffect(() => {
    if (filterMaxPrice) {
      const filteredProduct = productsData?.data.products.filter((product) => product.price <= filterMaxPrice);
      setFilteredProductsByPrice(filteredProduct);
    }
  }, [filterMaxPrice, filterMinPrice, productsData?.data.products]);

  // Filter the products compere => <= price //
  useEffect(() => {
    if (filterMinPrice?.length && filterMaxPrice?.length) {
      const filtered = productsData?.data.products.filter((product) => {
        return product.price >= filterMinPrice && product.price <= filterMaxPrice;
      });
      setFilteredProductsByPrice(filtered);
    }
  }, [filterMinPrice, filterMaxPrice, productsData?.data.products]);

  // Filter Product By Brands Name //
  const filteredProductsByBrands = [];
  productsData?.data.products?.forEach((product) => {
    if (filterByBrands.includes(product?.brand?.name)) {
      filteredProductsByBrands.push(product);
    }
  });

  // Filter Product By Status //
  const filteredProductsByStatus = [];

  if (filteredProductsByBrands.length > 0) {
    filteredProductsByBrands.forEach((product) => {
      if (filteredByStatus.includes(product?.status)) {
        filteredProductsByStatus.push(product);
      }
    });
  } else {
    productsData?.data?.products.forEach((product) => {
      if (filteredByStatus.includes(product?.status)) {
        filteredProductsByStatus.push(product);
      }
    });
  }

  // Filter Products By Colors Function //
  const filterProductsByColors = (products, colors) => {
    return products?.filter((product) => product.colors.some((color) => colors.includes(color.value)));
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
      const filteredProducts = filterProductsByColors(productsData?.data.products, filterByColors);
      setFilteredProductsByColors(filteredProducts);
    }
  }, [filterByColors]);

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
      : filteredProductsByStatus?.length > 0
      ? filteredProductsByStatus
      : filteredProductsByBrands?.length
      ? filteredProductsByBrands
      : productsData?.data.products;

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
              <h2 className="text-base font-semibold text-gray-800">
                Searching for “ {router.query.search || router.query?.category}”
              </h2>
              <p className="text-sm">{productsData?.total} results found</p>
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
                <option value="price">Price low to high</option>
                <option value="-price">Price high to low</option>
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
                  brands={brands?.data}
                  products={productsData?.data.products}
                  setFilterByBrands={setFilterByBrands}
                  setFilterByColors={setFilterByColors}
                  setFilterMinPrice={setFilterMinPrice}
                  setFilterMaxPrice={setFilterMaxPrice}
                  setFilteredByStatus={setFilteredByStatus}
                />
              </div>
            </div>
            <div className="col-span-5 lg:col-span-4">
              <div className="grid grid-cols-2 gap-x-2 gap-y-5 rounded-md sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4">
                {productsData?.data.products.length > 0 ? (
                  renderProducts()
                ) : (
                  <div className="flex h-[60vh] w-[53vw] items-center justify-center text-4xl text-my-gray-100">
                    <p>Product not found</p>
                  </div>
                )}
              </div>
              <div className="mt-10 mb-20 text-center">
                {productsData?.data?.page > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={productsData?.data?.page}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {showSidebar && (
        <SearchingProductsSidebar
          products={productsData?.data.products}
          brands={brands.data}
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

export default SearchingProducts;
