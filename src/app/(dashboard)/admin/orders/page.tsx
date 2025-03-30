"use client";

import { Pagination } from "@/components/sharedComponents";
import { Loading } from "@/components/sharedComponents/loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useGetAllOrdersQuery } from "@/redux/features/order/orders/ordersApi";
import { TMainOrder, TOrderStatus } from "@/types/Orderstype";
import { format } from "date-fns";
import { EllipsisVertical, Eye, Package, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BiLockAlt } from "react-icons/bi";

const statusColors: Record<TOrderStatus, string> = {
  [TOrderStatus.PENDING]: "bg-blue-500 hover:bg-blue-600",
  [TOrderStatus.PROCESSING]: "bg-yellow-500 hover:bg-yellow-600",
  [TOrderStatus.SHIPPED]: "bg-purple-500 hover:bg-purple-600",
  [TOrderStatus.DELIVERED]: "bg-green-500 hover:bg-green-600",
  [TOrderStatus.CANCELLED]: "bg-red-500 hover:bg-red-600",
};

const AdminAllOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  // Include searchText (orderId) as part of query parameters
  const { data: orders, isLoading } = useGetAllOrdersQuery({
    limit: 11,
    page: currentPage,
    status: statusFilter || undefined,
    search: searchText.trim() || undefined,
  });

  if (isLoading) return <Loading />;

  return (
    <Card className="md:m-6">
      <CardHeader className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center space-x-4">
          <CardTitle className="flex items-center text-xl font-bold text-slate-700 md:text-2xl">
            <Package className="mr-2 text-primary" />
            All Orders
          </CardTitle>
        </div>
        <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:items-center">
          <Input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1); // reset page when search changes
            }}
            placeholder="Search Order ID"
            className="w-full md:w-72 h-10"
          />
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value as TOrderStatus);
              setCurrentPage(1); // reset page when filter changes
            }}
          >
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Recent Orders" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TOrderStatus.PENDING}>Pending</SelectItem>
              <SelectItem value={TOrderStatus.PROCESSING}>
                Processing
              </SelectItem>
              <SelectItem value={TOrderStatus.SHIPPED}>Shipped</SelectItem>
              <SelectItem value={TOrderStatus.DELIVERED}>Completed</SelectItem>
              <SelectItem value={TOrderStatus.CANCELLED}>Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <Table className="overflow-x-auto rounded-lg shadow-lg">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Order ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Address</TableHead>
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
              orders?.data?.data?.map((order: TMainOrder) => {
                console.log(order);
                return (
                  <TableRow key={order._id} className="hover:bg-gray-50">
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order?.shippingAddress?.name}</TableCell>
                    <TableCell className="truncate">
                      {order?.shippingAddress.area},{" "}
                      {order?.shippingAddress.city},{" "}
                      {order?.shippingAddress.street}
                    </TableCell>
                    <TableCell>${order?.totalAmount}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>
                      <Badge
                        variant={order.isPaid ? "default" : "outline"}
                        className={cn(
                          order.isPaid && "bg-green-500 hover:bg-green-600",
                        )}
                      >
                        {order.isPaid ? "Paid" : "Unpaid"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(statusColors[order.status], "capitalize")}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(order.createdAt), "dd-MMMM-yyyy")}
                    </TableCell>
                    <TableCell>
                      <Link
                        className="flex text-gray-600 hover:text-primary"
                        href={`/admin/orders/${order._id}`}
                      >
                        <Eye className="mr-1 h-5 w-5" />
                        Details
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
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
              <TableCell colSpan={6}>
                Total {orders?.data?.meta?.total} Orders
              </TableCell>
              <TableCell colSpan={3} className="text-right">
                <Pagination
                  currentPage={currentPage}
                  totalPages={orders?.data?.meta?.page}
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

export default AdminAllOrders;
