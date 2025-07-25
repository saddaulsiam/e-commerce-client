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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/order/orders/ordersApi";
import { TMainOrder, TOrderStatus } from "@/types/Orderstype";
import { format } from "date-fns";
import { EllipsisVertical, Eye, Package, PackageCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcShipped } from "react-icons/fc";
import { toast } from "react-toastify";

const AdminDashboardAllOrders = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  // Include searchText (orderId) as part of query parameters
  const {
    data: orders,
    isLoading,
    refetch,
  } = useGetAllOrdersQuery({
    limit: 11,
    page: currentPage,
    status: statusFilter || undefined,
    search: searchText.trim() || undefined,
  });

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateOrderStatus({ id, status }).unwrap();
      refetch();
    } catch {
      toast.error("Failed to update order status");
    }
  };

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
            className="h-10 w-full md:w-72"
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
              orders?.data?.data?.map((order: TMainOrder) => (
                <TableRow key={order._id} className="hover:bg-gray-50">
                  <TableCell
                    onClick={() => {
                      navigator.clipboard.writeText(order._id as string);
                      toast.success("User ID copied to clipboard");
                    }}
                    className="cursor-pointer hover:text-blue-600 hover:underline"
                  >
                    {order?._id?.slice(0, 5)}...
                    {order?._id?.slice(-5)}
                  </TableCell>
                  <TableCell>{order?.shippingAddress?.name}</TableCell>
                  <TableCell className="truncate">
                    {order?.shippingAddress.street},
                    {order?.shippingAddress.area}, {order?.shippingAddress.city}
                    ,{order?.shippingAddress.region}
                  </TableCell>
                  <TableCell>
                    <span className="mr-1 text-2xl">৳</span>
                    {order?.totalAmount}
                  </TableCell>
                  <TableCell className="capitalize">
                    {order.paymentMethod}
                  </TableCell>
                  <TableCell>
                    <Status status={order.isPaid ? "Paid" : "Unpaid"} />
                  </TableCell>
                  <TableCell>
                    <Status status={order.status} />
                  </TableCell>
                  <TableCell>
                    {format(new Date(order.createdAt), "dd-MMMM-yyyy")}
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
                            router.push(`/admin/orders/${order._id}`)
                          }
                        >
                          <Eye /> View Details
                        </DropdownMenuItem>
                        {order.status === TOrderStatus.PROCESSING && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(
                                order._id!,
                                TOrderStatus.SHIPPED,
                              )
                            }
                          >
                            <FcShipped /> Make Shipped
                          </DropdownMenuItem>
                        )}
                        {order.status === TOrderStatus.SHIPPED && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(
                                order._id!,
                                TOrderStatus.DELIVERED,
                              )
                            }
                          >
                            <PackageCheck /> Make Delivered
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

export default AdminDashboardAllOrders;
