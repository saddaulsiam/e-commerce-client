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
import {
  ChevronRightIcon,
  LucideShoppingBag
} from "lucide-react";

const VendorDashboardMainResentOrders = () => {
  // Sample fake data for demonstration
  const recentOrders = [
    { id: 1, customer: "John Doe", status: "Pending", amount: 150 },
    { id: 2, customer: "Jane Smith", status: "Completed", amount: 200 },
    { id: 3, customer: "Bob Wilson", status: "Cancelled", amount: 75 },
    { id: 4, customer: "Alice Brown", status: "Pending", amount: 300 },
    { id: 5, customer: "John Doe", status: "Pending", amount: 150 },
    { id: 6, customer: "Jane Smith", status: "Completed", amount: 200 },
  ];
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="mb-1 flex">
              <LucideShoppingBag className="mr-2 h-6 w-6 text-primary" />
              Recent Orders
            </CardTitle>
            <CardDescription>Latest transactions</CardDescription>
          </div>
          <Button variant="ghost">
            View All <ChevronRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell className="text-right">${order.amount}</TableCell>
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
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-amber-100 text-amber-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <Badge
      variant="outline"
      className={statusMap[status as keyof typeof statusMap]}
    >
      {status}
    </Badge>
  );
};

export default VendorDashboardMainResentOrders;
