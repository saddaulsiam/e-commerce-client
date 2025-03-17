"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TSubOrder } from "@/types/Orderstype";
import { ChevronRightIcon, LucideShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

const VendorDashboardMainResentOrders = ({ recentOrders }: any) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="mb-1 flex text-xl md:text-2xl">
              <LucideShoppingBag className="mr-2 h-6 w-6 text-primary" />
              Recent Orders
            </CardTitle>
            <CardDescription>Latest transactions</CardDescription>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.push("/vendor/orders/pending")}
          >
            View All <ChevronRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders?.map((order: TSubOrder) => (
              <TableRow key={order?._id}>
                <TableCell className="truncate">
                  {order?._id.slice(0, 5)}...{order?._id.slice(-5)}
                </TableCell>
                <TableCell>{order?.shippingAddress?.name}</TableCell>
                <TableCell>{order?.shippingAddress?.phoneNumber}</TableCell>
                <TableCell>
                  <StatusBadge status={order?.status} />
                </TableCell>
                <TableCell className="text-right">
                  ${order?.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Status Badge Component using shadcn UI
const StatusBadge = ({ status }: { status: string }) => {
  const statusMap = {
    delivered: "bg-green-200 text-green-800",
    pending: "bg-amber-200 text-amber-800",
    processing: "bg-amber-200 text-amber-800",
    cancelled: "bg-red-200 text-red-800",
  };

  return (
    <Badge
      variant="outline"
      className={`${statusMap[status as keyof typeof statusMap]} capitalize`}
    >
      {status}
    </Badge>
  );
};

export default VendorDashboardMainResentOrders;
