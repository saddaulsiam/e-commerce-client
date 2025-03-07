"use client";

import { Loading, Pagination } from "@/components/sharedComponents";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/products/productsApi";
import { TProduct } from "@/types/common";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsCardText } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const VendorAllProducts = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch products
  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductsQuery({
    limit: 6,
    page: currentPage,
  });

  // Handle product deletion
  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
          .unwrap()
          .then((res) => {
            if (res.success) {
              toast.success(res.data.message);
            } else {
              toast.error("Failed to delete product");
            }
          });
      }
    });
  };

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <Loading />;

  if (isError || !products?.data?.data)
    return <div className="text-red-500">Error loading products.</div>;

  return (
    <div className="container">
      <h3 className="my-5 flex items-center text-2xl font-semibold text-primary">
        <BsCardText className="mr-3" />
        All Products
      </h3>

      <Table className="overflow-x-auto">
        {/* Table Header */}
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableCell>Product Name</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Price</TableCell>
            <TableCell className="text-center">Actions</TableCell>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {products.data.data.map((product: TProduct) => (
            <TableRow key={product._id} className="hover:bg-gray-50">
              <TableCell className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="relative h-16 w-24">
                    <Image
                      layout="fill"
                      src={product.images[0]}
                      alt={product.name}
                      priority
                    />
                  </div>
                  <div>
                    <div className="text-lg font-bold">
                      {product.name.slice(0, 25)}...
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.status} ({product.stock})
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="p-4 text-base text-gray-600">
                {product.description.slice(0, 40)}...
                <br />
                {product.colors?.map((color, i) => (
                  <span
                    key={i}
                    className="rounded-full px-3 text-sm text-white"
                    style={{
                      backgroundColor: color,
                    }}
                  >
                    {color}
                  </span>
                ))}
              </TableCell>
              <TableCell className="p-4 text-sm text-gray-500">
                {product.brand}
              </TableCell>
              <TableCell className="p-4">
                <span className="text-sm text-gray-400 line-through">
                  ${product.price}
                </span>{" "}
                <span className="font-bold text-primary">
                  ${product.price - product.discount}
                </span>
              </TableCell>
              <TableCell className="space-x-2 p-4 text-center">
                <Button
                  className="rounded-full p-3 transition-all duration-300 hover:bg-orange-600"
                  onClick={() => router.push(`/vendor/products/${product._id}`)}
                  aria-label="Edit Product"
                  title="Edit Product"
                >
                  <TbEdit />
                </Button>
                <Button
                  className="rounded-full bg-red-500 p-3 transition-all duration-300 hover:bg-red-600"
                  onClick={() => handleDeleteProduct(product._id!)}
                  aria-label="Delete Product"
                  title="Delete Product"
                >
                  <MdDeleteOutline />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter className="bg-gray-100">
          <TableRow>
            <TableCell colSpan={1}>
              Total {products.data.meta.total} Products Found
            </TableCell>
            <TableCell colSpan={4}>
              <Pagination
                currentPage={currentPage}
                totalPages={products.data.meta.page}
                onPageChange={handlePageChange}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default VendorAllProducts;
