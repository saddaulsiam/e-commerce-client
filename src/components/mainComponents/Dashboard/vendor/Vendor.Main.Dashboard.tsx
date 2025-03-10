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
import RatingStars from "@/components/ui/rating";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRightIcon, StarIcon } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import {
  FiAlertCircle,
  FiArrowUpRight,
  FiPackage,
  FiTrendingUp,
} from "react-icons/fi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DashboardPage = () => {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">(
    "monthly",
  );
  const [data, setData] = useState<any>(null);

  // Sample fake data for demonstration
  const fakeData = {
    overview: {
      totalSales: 32000,
      pendingOrders: 45,
      lowStockProducts: 12,
      monthlyEarnings: 8500,
    },
    salesData: {
      monthly: [
        { week: "Week 1", sales: 4000, orders: 120 },
        { week: "Week 2", sales: 6500, orders: 210 },
        { week: "Week 3", sales: 7200, orders: 180 },
        { week: "Week 4", sales: 4800, orders: 150 },
      ],
      weekly: [
        { day: "Mon", sales: 1200, orders: 45 },
        { day: "Tue", sales: 1800, orders: 62 },
        { day: "Wed", sales: 2100, orders: 78 },
        { day: "Thu", sales: 1750, orders: 65 },
        { day: "Fri", sales: 2400, orders: 89 },
        { day: "Sat", sales: 3000, orders: 102 },
        { day: "Sun", sales: 2750, orders: 95 },
      ],
      daily: [
        { hour: "12 AM", sales: 200, orders: 8 },
        { hour: "4 AM", sales: 450, orders: 15 },
        { hour: "8 AM", sales: 1200, orders: 42 },
        { hour: "12 PM", sales: 2400, orders: 85 },
        { hour: "4 PM", sales: 1800, orders: 68 },
        { hour: "8 PM", sales: 900, orders: 35 },
      ],
    },
    recentOrders: [
      { id: 1, customer: "John Doe", status: "Pending", amount: 150 },
      { id: 2, customer: "Jane Smith", status: "Completed", amount: 200 },
      { id: 3, customer: "Bob Wilson", status: "Cancelled", amount: 75 },
      { id: 4, customer: "Alice Brown", status: "Pending", amount: 300 },
      { id: 5, customer: "John Doe", status: "Pending", amount: 150 },
      { id: 6, customer: "Jane Smith", status: "Completed", amount: 200 },
    ],
    products: [
      { id: 1, name: "Wireless Headphones", stock: 5, price: 149.99 },
      { id: 2, name: "Smart Watch", stock: 15, price: 199.99 },
      { id: 3, name: "Portable Speaker", stock: 3, price: 79.99 },
      { id: 4, name: "Bluetooth Earbuds", stock: 20, price: 59.99 },
    ],
    reviews: [
      {
        id: 1,
        product: "Wireless Headphones",
        rating: 4,
        comment: "Excellent sound quality!",
      },
      {
        id: 2,
        product: "Smart Watch",
        rating: 5,
        comment: "Best smartwatch I've owned",
      },
      {
        id: 3,
        product: "Portable Speaker",
        rating: 3,
        comment: "Good but battery life could be better",
      },
    ],
  };

  useEffect(() => {
    // Simulate an API call delay
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData(fakeData);
    };
    loadData();
  }, []);

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Vendor Name</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`$${data.overview.totalSales.toLocaleString()}`}
          trend="12.5%"
          positive={true}
          icon={<FiTrendingUp className="h-6 w-6 text-white" />}
          color="bg-gradient-to-br from-indigo-500 to-purple-500 "
        />
        <StatCard
          title="Pending Orders"
          value={data.overview.pendingOrders}
          trend="5.2%"
          positive={false}
          icon={<FiAlertCircle className="h-6 w-6 text-white" />}
          color="bg-gradient-to-br from-primary to-orange-500"
        />
        <StatCard
          title="Low Stock"
          value={data.overview.lowStockProducts}
          trend="Attention"
          positive={false}
          icon={<FiPackage className="h-6 w-6 text-white" />}
          color="bg-gradient-to-br from-red-500 to-pink-500"
        />
        <StatCard
          title="Earnings"
          value={`$${data.overview.monthlyEarnings.toLocaleString()}`}
          trend="8%"
          positive={true}
          icon={<FiTrendingUp className="h-6 w-6 text-white" />}
          color="bg-gradient-to-br from-green-500 to-teal-500"
        />
      </div>

      {/* Sales Chart */}
      <Card className="mb-8">
        <CardHeader className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>
              Performance for the selected period
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={timeRange === "daily" ? "default" : "outline"}
              onClick={() => setTimeRange("daily")}
            >
              Daily
            </Button>
            <Button
              variant={timeRange === "weekly" ? "default" : "outline"}
              onClick={() => setTimeRange("weekly")}
            >
              Weekly
            </Button>
            <Button
              variant={timeRange === "monthly" ? "default" : "outline"}
              onClick={() => setTimeRange("monthly")}
            >
              Monthly
            </Button>
          </div>
        </CardHeader>
        <CardContent className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.salesData[timeRange]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={
                  timeRange === "monthly"
                    ? "week"
                    : timeRange === "weekly"
                      ? "day"
                      : "hour"
                }
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#6366f1" name="Sales ($)" />
              <Bar dataKey="orders" fill="hsl(var(--primary))" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Products & Reviews Section */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Products Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
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
                {data.recentOrders.map((order: any) => (
                  <TableRow key={order.id}>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      ${order.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Reviews Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>Recent product feedback</CardDescription>
              </div>
              <Badge className="flex items-center gap-1">
                <StarIcon className="h-4 w-4 fill-current" />
                4.8
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.reviews.map((review: any) => (
              <div
                key={review.id}
                className="rounded-lg border bg-background p-4 transition hover:bg-muted/50"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <RatingStars rating={4.4} />
                  </div>
                  <span className="text-sm text-muted-foreground">2h ago</span>
                </div>
                <p className="text-sm">{review.comment}</p>
                <Badge variant="secondary" className="mt-2">
                  {review.product}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Enhanced Stat Card Component using shadcn UI
const StatCard = ({
  title,
  value,
  trend,
  positive,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  trend: string;
  positive: boolean;
  icon: ReactNode;
  color: string;
}) => (
  <div
    className={`${color} rounded-2xl p-6 text-white transition-transform duration-500 hover:scale-[1.02]`}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium opacity-90">{title}</p>
        <p className="mt-2 text-3xl font-bold">{value}</p>
      </div>
      <div className="rounded-xl bg-white bg-opacity-20 p-3">{icon}</div>
    </div>
    <div className="mt-4 flex items-center">
      <span
        className={`text-sm ${positive ? "text-green-100" : "text-red-100"}`}
      >
        {positive ? "+" : "-"}
        {trend}
      </span>
      <FiArrowUpRight
        className={`ml-2 ${positive ? "text-green-100" : "text-red-100"}`}
      />
    </div>
  </div>
);

// Status Badge Component using shadcn UI
function StatusBadge({ status }: { status: string }) {
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
}

export default DashboardPage;
