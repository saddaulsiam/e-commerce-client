"use client";

import { Loading, Pagination } from "@/components/sharedComponents";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { TOrderStatus, TSubOrder } from "@/types/Ordertype";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const VendorPendingOrders = () => {
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
    <Card className="m-6">
      <CardHeader>
        <CardTitle className="flex items-center font-bold text-slate-700">
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
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Order Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.data?.data.length > 0 ? (
              orders?.data?.data?.map((order: TSubOrder) => (
                <TableRow key={order._id} className="hover:bg-gray-50">
                  <TableCell>{order._id}</TableCell>
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
                  <TableCell>
                    {order.paymentMethod} ({order.isPaid ? "Paid" : "Unpaid"})
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="capitalize">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(
                      new Date(order.createdAt),
                      "dd-MMMM-yyyy | hh:mm a",
                    )}
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
              <TableCell colSpan={4}>
                Total {orders?.data?.meta?.total} Orders
              </TableCell>
              <TableCell colSpan={5} className="text-right">
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
