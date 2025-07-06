"use client";

import { Pagination } from "@/components/sharedComponents";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/product/productApi";
import { useAppSelector } from "@/redux/hooks";
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
  const [currentPage, setCurrentPage] = useState(1);

  const { user } = useAppSelector(({ state }) => state.auth);

  // Fetch products
  const { data: products, isLoading } = useGetAllProductsQuery({
    limit: 6,
    page: currentPage,
    supplier: user?.vendor._id || undefined,
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

  console.log(products?.data?.meta);
  return (
    <Card className="md:m-6">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold text-slate-700 md:text-2xl">
          <BsCardText className="mr-2 text-primary" />
          All Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="overflow-x-auto">
          {/* Table Header */}
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Product</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <Skeleton className="my-2 h-20 w-full" />
                  <Skeleton className="my-2 h-20 w-full" />
                  <Skeleton className="my-2 h-20 w-full" />
                  <Skeleton className="my-2 h-20 w-full" />
                  <Skeleton className="my-2 h-20 w-full" />
                </TableCell>
              </TableRow>
            ) : products?.data?.data && products.data.data.length > 0 ? (
              products.data.data.map((product: TProduct) => (
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
                          {product.name.length > 25
                            ? `${product.name.slice(0, 25)}...`
                            : product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.status} ({product.stock})
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-4 text-base text-gray-600">
                    {product.description.length > 40
                      ? `${product.description.slice(0, 40)}...`
                      : product.description}
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
                    {product.category}
                  </TableCell>
                  <TableCell className="p-4 text-sm text-gray-500">
                    {product.brand}
                  </TableCell>
                  <TableCell className="p-4">
                    <div className="flex flex-col">
                      <p
                        className={`text-sm ${product.discount ? "text-gray-400 line-through" : "font-bold text-primary"}`}
                      >
                        {product.price}
                      </p>
                      {product.discount && (
                        <p className="font-bold text-primary">
                          <span className="mr-1 text-xl">৳</span>
                          {(product.price - product.discount).toFixed(0)}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="space-x-2 p-4 text-center">
                    <Button
                      className="rounded-full p-3 transition-all duration-300 hover:bg-orange-600"
                      onClick={() =>
                        router.push(`/vendor/products/${product._id}`)
                      }
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-lg text-gray-600"
                >
                  No orders found at the moment.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter className="bg-gray-100">
            <TableRow>
              <TableCell colSpan={2}>
                Total {products?.data?.meta?.total} Products Found
              </TableCell>
              <TableCell colSpan={4}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(
                    products?.data?.meta?.total / products?.data?.meta?.limit,
                  )}
                  onPageChange={handlePageChange}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default VendorAllProducts;
