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
import { useGetVendorOrdersQuery } from "@/redux/features/vendor/vendorApi";
import { useAppSelector } from "@/redux/hooks";
import { TStatus } from "@/types/common";
import { TOrderStatus, TSubOrder } from "@/types/Orderstype";
import { format } from "date-fns";
import { Clock, EllipsisVertical, Eye, Lock, View } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcCancel, FcShipped } from "react-icons/fc";
import { toast } from "react-toastify";

const VendorPendingOrders = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAppSelector(({ state }) => state.auth);

  const { data: orders, isLoading } = useGetVendorOrdersQuery({
    limit: 8,
    page: currentPage,
    vendorId: user?.vendor._id,
    status: TOrderStatus.PROCESSING,
  });

  //  pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <Loading />;

  return (
    <Card className="md:m-6">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold text-slate-700 md:text-2xl">
          <Clock className="mr-2 text-primary" />
          Pending Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="overflow-x-auto">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Order ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>IsPaid</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.data?.data.length > 0 ? (
              orders?.data?.data?.map((order: TSubOrder) => (
                <TableRow key={order._id} className="hover:bg-gray-50">
                  <TableCell
                    onClick={() => {
                      navigator.clipboard.writeText(order._id);
                      toast.success("Order ID copied to clipboard");
                    }}
                    className="cursor-pointer hover:text-blue-600 hover:underline"
                  >
                    {order?._id?.slice(0, 5)}...
                    {order?._id?.slice(-5)}
                  </TableCell>
                  <TableCell>
                    <div className="relative h-16 w-24">
                      <Image
                        layout="fill"
                        src={order.item.productId.images[0]}
                        alt={order.item.name}
                        priority
                      />
                    </div>
                  </TableCell>
                  <TableCell>{order.item.name}</TableCell>
                  <TableCell>{order.item.quantity}</TableCell>
                  <TableCell>${order.item.price}</TableCell>
                  <TableCell>${order.totalAmount}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>
                    <Status status={order.isPaid ? "Paid" : "Unpaid"} />
                  </TableCell>
                  <TableCell>
                    <Status status={order.status} />
                  </TableCell>
                  <TableCell>
                    {format(
                      new Date(order.createdAt),
                      "dd-MMMM-yyyy | hh:mm a",
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <EllipsisVertical size={20} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/vendor/orders/${order._id}`)
                          }
                        >
                          <Eye /> View Details
                        </DropdownMenuItem>
                        {order.status === TOrderStatus.PROCESSING ? (
                          <DropdownMenuItem>
                            <FcCancel /> Cancel Order
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            <FcShipped /> Make Shipped
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center text-lg text-gray-600"
                >
                  No orders found at the moment.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter className="bg-gray-100">
            <TableRow>
              <TableCell colSpan={8}>
                Total {orders?.data?.meta?.total} Orders
              </TableCell>
              <TableCell colSpan={3} className="text-right">
                <Pagination
                  currentPage={currentPage}
                  totalPages={orders?.data?.meta?.page}
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

export default VendorPendingOrders;
