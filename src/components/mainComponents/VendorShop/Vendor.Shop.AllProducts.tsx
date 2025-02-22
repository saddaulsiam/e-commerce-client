import { useRouter } from "next/navigation";
import { FiFilter } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import { Pagination, ProductsCard } from "../../sharedComponents";
import { SearchingProductsSidebarMenu } from "../SearchingProducts";
import { useGetBrandsQuery } from "../../../redux/features/brands/brandsApi";
import { useGetProductsQuery } from "../../../redux/features/products/productsApi";

const VendorShopAllProducts = ({ search, setShowSidebar }) => {
  const [sort, setSort] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterMinPrice, setFilterMinPrice] = useState(0);
  const [filterMaxPrice, setFilterMaxPrice] = useState(null);
  const [filterByBrands, setFilterByBrands] = useState([]);
  const [filterByColors, setFilterByColors] = useState([]);
  const [filteredByPrice, setFilteredByPrice] = useState([]);
  const [filteredByStatus, setFilteredByStatus] = useState([]);
  const [filteredProductsByColors, setFilteredProductsByColors] = useState([]);

  const { data: productsData, isLoading } = useGetProductsQuery({
    limit: 8,
    page: currentPage,
    sort,
  });

  // useEffect(() => {
  //   if (router.query.search) {
  //     getData({
  //       limit: 12,
  //       page: currentPage,
  //       sort: sort,
  //       search: router.query.search,
  //     });
  //   } else if (router.query.category) {
  //     getData({
  //       limit: 12,
  //       page: currentPage,
  //       sort: sort,
  //       category: router.query.category,
  //     });
  //   }
  // }, [currentPage, sort, getData, router.query.category, router.query.search]);

  // Get brands //
  const { data: brands } = useGetBrandsQuery();

  // Filter Product By filterMinPrice >= price //
  useEffect(() => {
    if (filterMinPrice) {
      const filteredProduct = productsData?.data.products.filter((product) => product.price >= filterMinPrice);
      setFilteredByPrice(filteredProduct);
    }
  }, [filterMinPrice, filterMaxPrice, productsData?.data.products]);

  // Filter Product By filterMaxPrice <= price //
  useEffect(() => {
    if (filterMaxPrice) {
      const filteredProduct = productsData?.data.products.filter((product) => product.price <= filterMaxPrice);
      setFilteredByPrice(filteredProduct);
    }
  }, [filterMaxPrice, filterMinPrice, productsData?.data.products]);

  // Filter the products compere => <= price //
  useEffect(() => {
    if (filterMinPrice?.length && filterMaxPrice?.length) {
      const filtered = productsData?.data.products.filter((product) => {
        return product.price >= filterMinPrice && product.price <= filterMaxPrice;
      });
      setFilteredByPrice(filtered);
    }
  }, [filterMinPrice, filterMaxPrice, productsData?.data.products]);

  // Filter Product By Brands Name //
  const filteredProductsByBrands = [];
  productsData?.data?.products.forEach((product) => {
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
    let productsToRender = filteredByPrice?.length
      ? filteredByPrice
      : filteredProductsByColors?.length
      ? filteredProductsByColors
      : filteredProductsByStatus?.length > 0
      ? filteredProductsByStatus
      : filteredProductsByBrands?.length
      ? filteredProductsByBrands
      : productsData?.data?.products;

    return productsToRender?.map((product) => <ProductsCard key={product._id} product={product} />);
  };

  return (
    <div className="grid grid-cols-5 gap-5 px-3 xl:px-0">
      <div className="hidden sm:col-span-1 lg:block">
        <div className="rounded-md bg-white">
          <SearchingProductsSidebarMenu
            brands={brands?.data}
            products={productsData?.data.products}
            setFilteredByStatus={setFilteredByStatus}
            setFilterByBrands={setFilterByBrands}
            setFilterByColors={setFilterByColors}
            setFilterMinPrice={setFilterMinPrice}
            setFilterMaxPrice={setFilterMaxPrice}
          />
        </div>
      </div>
      <div className="col-span-5 lg:col-span-4">
        <div className="mb-3 flex-1 justify-between space-y-5 rounded-md bg-white p-5 md:flex">
          <div className="flex items-center ">
            <h2 className="text-lg font-semibold text-gray-800">Store Name</h2>
          </div>
          <div className="flex items-center space-x-3 text-sm text-my-gray-200 sm:space-x-4 sm:text-base">
            <p>Short by:</p>
            <select
              name=""
              id=""
              className="h-10 rounded border border-gray-300 focus:border-secondary"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Best Match</option>
              <option value="price">Status low to high</option>
              <option value="-price">Price high to low</option>
            </select>
            <p
              className="cursor-pointer rounded-full p-2 text-lg hover:bg-slate-200 sm:text-xl lg:hidden"
              onClick={() => setShowSidebar(true)}
            >
              <FiFilter />
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
        <div className="grid grid-cols-2 gap-x-2 gap-y-5 rounded-md sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4">
          {productsData?.data?.products?.length > 0 ? (
            renderProducts()
          ) : (
            <div className="flex h-[60vh] w-[53vw] items-center justify-center text-4xl text-my-gray-100">
              <p>Product not found</p>
            </div>
          )}
        </div>
        <div className="mt-10 mb-20 text-center">
          {productsData?.data?.page < 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={productsData?.data?.page}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorShopAllProducts;
