"use client";

import Head from "next/head";
import { useState } from "react";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useGetProductsQuery } from "../../../../redux/features/products/productsApi";
import { Loading, Pagination } from "../../../sharedComponents";
import ProductsCard from "../../../sharedComponents/productsCard/Products.Card";
import DashboardCustomerSideBarNavigation from "./Dashboard.Customer.SideBar.Navigation";

const DashboardCustomersWishlists = () => {
  const [showSideNavigation, setShowSideNavigation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetProductsQuery({
    limit: 4,
    page: currentPage,
    sort: "",
  });

  //  pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <Head>
        <title>My Wish List</title>
      </Head>

      <div className="mb-10">
        <div className="grid grid-cols-2 gap-y-5">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold text-primary">
              <BsFillSuitHeartFill className="mr-3 inline text-primary" />
              <span> My Wish List</span>
            </h2>
          </div>
          <div className="flex justify-end lg:hidden">
            <button className="text-2xl font-thin " onClick={() => setShowSideNavigation(true)}>
              <GiHamburgerMenu />
            </button>
          </div>
          <div className="flex lg:justify-end">
            <button className="button">Add All To Cart</button>
          </div>
        </div>
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <div className="pt-5 ">
            <div className="bg-whit grid grid-cols-2 gap-x-3 gap-y-10 rounded-md sm:grid-cols-3 lg:grid-cols-4 ">
              {data?.data?.products.slice(0, 8).map((product, index) => (
                <ProductsCard product={product} key={index} />
              ))}
            </div>
            <div className="mt-10 text-center">
              {data?.data?.page < 1 && (
                <Pagination currentPage={currentPage} totalPages={data?.data?.page} onPageChange={handlePageChange} />
              )}
            </div>
          </div>
        )}
        {showSideNavigation && <DashboardCustomerSideBarNavigation setShowSideNavigation={setShowSideNavigation} />}
      </div>
    </>
  );
};

export default DashboardCustomersWishlists;
