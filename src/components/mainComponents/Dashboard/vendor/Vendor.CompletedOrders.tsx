"use client";

import { Pagination } from "@/components/sharedComponents";
import { Loading } from "@/components/sharedComponents/loader";
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
import { TOrderStatus, TSubOrder } from "@/types/Orderstype";
import { format } from "date-fns";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

const VendorCompletedOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAppSelector(({ state }) => state.auth);

  const { data: orders, isLoading } = useGetVendorOrdersQuery({
    limit: 8,
    page: currentPage,
    vendorId: user?.vendor._id,
    status: TOrderStatus.DELIVERED,
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
          <CheckCircle className="mr-2 text-primary" />
          Completed Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="overflow-x-auto">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
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
                  <TableCell>{order.item.name}</TableCell>
                  <TableCell>{order.item.quantity}</TableCell>
                  <TableCell>${order.item.price}</TableCell>
                  <TableCell>${order.totalAmount}</TableCell>
                  <TableCell>
                    {order.paymentMethod} ({order.isPaid ? "Paid" : "Unpaid"})
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-500 capitalize hover:bg-green-600">
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
                  colSpan={8}
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
              <TableCell colSpan={4} className="text-right">
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

export default VendorCompletedOrders;
