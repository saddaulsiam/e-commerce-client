import Head from "next/head";
import Image from "next/image";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TbEdit } from "react-icons/tb";
import { BsCardText } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import withReactContent from "sweetalert2-react-content";

// local
import { useDeleteProductMutation, useGetProductsQuery } from "../../../../redux/features/products/productsApi";
import { Loading, Pagination } from "../../../sharedComponents";

const VendorAllProducts = () => {
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const [currentPage, setCurrentPage] = useState(1);

  // get product
  const { data, isLoading } = useGetProductsQuery({
    limit: 8,
    page: currentPage,
    sort: "",
  });

  // delete product
  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id).then((res) => {
          if (res.data.status === "success") {
            toast.success(res.data.message);
          }
        });
      }
    });
  };

  //  pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <Head>
        <title>All Product</title>
      </Head>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="container">
          <div className="mb-10">
            <p className="flex items-center text-2xl font-semibold text-primary">
              <BsCardText className="mr-3 inline text-primary" />
              All Products
            </p>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="table w-full">
              {/* <!-- head --> */}
              <thead>
                <tr className="hover:bg-stone-200">
                  <td>Product Name</td>
                  <td>Details</td>
                  <td>Color</td>
                  <td>Price</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {/* <!-- row  --> */}

                {data?.data?.products.map((product, i) => (
                  <tr className="hover" key={i}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle relative h-12 w-12">
                            <Image
                              layout="fill"
                              src={product?.mainImage}
                              alt="Avatar Tailwind CSS Component"
                              priority
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold"> {product.name.slice(0, 25)}...</div>
                          <div className="text-sm opacity-50">
                            {product.status} ({product.quantity})
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {product.description.slice(0, 25)}...
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {product.colors.map((color, i) => (
                          <span key={i} className="px-1">
                            {color.value}
                          </span>
                        ))}
                      </span>
                    </td>
                    <td>{product.brand.name}</td>
                    <td>
                      <span className="text-sm text-gray-400 line-through">{product.price}</span>{" "}
                      <span className="font-bold text-primary">{product.price - product.discount}</span>
                    </td>
                    <th className="text-xl">
                      <button
                        className="rounded-full p-3 capitalize hover:bg-slate-300"
                        onClick={() => router.push(`/vendor/products/${product._id}`)}
                      >
                        <TbEdit />
                      </button>
                      <button
                        className="rounded-full p-3 capitalize hover:bg-slate-300"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <MdDeleteOutline />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
              {/* <!-- footer --> */}
              <tfoot className="bg-secondary ">
                <tr>
                  <th>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={data?.data?.page}
                      onPageChange={handlePageChange}
                    />
                  </th>
                  <th>
                    {data?.data?.products?.length} page of {currentPage} ( total
                    {data?.data?.total} items)
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default VendorAllProducts;
