"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useGetOrdersQuery } from "@/redux/features/order/orders/ordersApi";
import DashboardSideBarNavigation from "../Commone/DashboardSideBarNavigation";
import VendorAllOrdersCart from "./Vendor.AllOrdersCart";
import { Loading, Pagination } from "@/components/sharedComponents";

const VendorAllOrders = () => {
  const router = useRouter();
  const [showSideNavigation, setShowSideNavigation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: orders, isLoading } = useGetOrdersQuery({
    limit: 8,
    page: currentPage,
  });

  //  pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <Head>
        <title>All Orders</title>
      </Head>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="mb-10">
            <p className="flex items-center text-2xl font-semibold text-primary">
              <FaShoppingBag className="mr-3 inline text-primary" />
              My Orders
            </p>
          </div>

          {/* table */}
          <div className="w-full overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Order Id</td>
                  <td>Customer Name</td>
                  <td>Address</td>
                  <td>Order Date</td>
                  <td>Total Price</td>
                  <td>Status</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {orders?.data?.orders?.map((order, i) => (
                  <VendorAllOrdersCart key={i} order={order} i={i} />
                ))}
              </tbody>
              <tfoot className="bg-secondary">
                <tr>
                  <th>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={orders?.data?.page}
                      onPageChange={handlePageChange}
                    />
                  </th>
                  <th></th>
                  <th></th>
                  <th>
                    {orders?.data?.orders?.length} of {currentPage} page (
                    {orders?.data?.total} items)
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
          {showSideNavigation && (
            <DashboardSideBarNavigation
              setShowSideNavigation={setShowSideNavigation}
            />
          )}
        </div>
      )}
    </>
  );
};

export default VendorAllOrders;
