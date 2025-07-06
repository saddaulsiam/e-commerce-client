"use client";

import { Pagination } from "@/components/sharedComponents";
import { Loading } from "@/components/sharedComponents/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Status from "@/components/ui/status";
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
  useChangeProductStatusMutation,
  useGetAllProductsQuery,
} from "@/redux/features/product/productApi";
import { TProduct, TStatus } from "@/types/common";
import {
  EllipsisVertical,
  Eye,
  Lock,
  ShieldCheck,
  Trash2,
  Unlock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsCardText } from "react-icons/bs";
import { toast } from "react-toastify";

const AdminAllProducts = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [changeProductStatus] = useChangeProductStatusMutation();

  // Fetch products
  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductsQuery({
    limit: 6,
    page: currentPage,
  });

  const handleChangeStatus = async (id: string, status: string) => {
    const res = await changeProductStatus({ id, status }).unwrap();
    if (res.success) {
      toast.success(`Product ${status}`);
    }
  };

  if (isLoading) return <Loading />;

  if (isError || !products?.data?.data)
    return <div className="text-red-500">Error loading products.</div>;

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
                        <Status status={product.status} /> ({product.stock})
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="p-4 text-base text-gray-600">
                  <span className="block max-w-xs truncate whitespace-nowrap">
                    {product.description}
                  </span>
                  {/* <br /> */}
                  {product.colors?.map((color, i) => (
                    <span
                      key={i}
                      className="rounded-full px-3 py-1 text-xs text-white"
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
                    <span
                      className={`text-sm ${product.discount ? "text-gray-400 line-through" : "font-bold text-primary"}`}
                    >
                      {product.price}
                    </span>

                    {product.discount && (
                      <span className="font-bold text-primary">
                        <span className="mr-1 text-2xl">৳</span>
                        {(product.price - product.discount).toFixed(2)}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="space-x-2 p-4 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">
                        <EllipsisVertical size={20} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                      <DropdownMenuItem>
                        <Link className="flex" href={`/product/${product._id}`}>
                          <Eye className="mr-2 h-5 w-5" />
                          Details
                        </Link>
                      </DropdownMenuItem>
                      {product.status === TStatus.BLOCK ? (
                        <DropdownMenuItem
                          onClick={() =>
                            handleChangeStatus(product._id!, TStatus.INSTOCK)
                          }
                        >
                          <Unlock />
                          Unblock
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() =>
                            handleChangeStatus(product._id!, TStatus.BLOCK)
                          }
                        >
                          <Lock />
                          Block
                        </DropdownMenuItem>
                      )}
                      {product.status === TStatus.DELETED ? (
                        <DropdownMenuItem
                          onClick={() =>
                            handleChangeStatus(product._id!, TStatus.INSTOCK)
                          }
                        >
                          <ShieldCheck className="h-4 w-4" />
                          Make Active
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() =>
                            handleChangeStatus(product._id!, TStatus.DELETED)
                          }
                        >
                          <Trash2 /> Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="bg-gray-100">
            <TableRow>
              <TableCell colSpan={2}>
                Total {products.data.meta.total} Products Found
              </TableCell>
              <TableCell colSpan={4}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={products.data.meta.page}
                  onPageChange={setCurrentPage}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminAllProducts;
