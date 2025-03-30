"use client";

import { Pagination } from "@/components/sharedComponents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { USER_ROLE } from "@/constants/common";
import { cn } from "@/lib/utils";
import { useGetAllCustomersQuery } from "@/redux/features/admin/adminApi";
import { TUser } from "@/types/common";
import { format } from "date-fns";
import { EllipsisVertical, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { BiLockAlt } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";

const AdminAllCustomers = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: customers } = useGetAllCustomersQuery({
    page: currentPage,
    limit: 20,
  });

  return (
    <Card className="md:m-6">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold text-slate-700 md:text-2xl">
          <BsPeople className="mr-2 text-primary" />
          Customers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="overflow-x-auto">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers?.data?.data?.length > 0 ? (
              customers?.data?.data?.map((customer: TUser) => (
                <TableRow key={customer?._id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="relative h-16 w-16">
                      <Image
                        layout="fill"
                        className="rounded-full"
                        src={customer?.profile?.photo || "/user-avatar.jpg"}
                        alt="Customer Image"
                        priority
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {customer?.displayName}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        (cn(
                          customer?.role === (USER_ROLE.ADMIN as string)
                            ? "bg-primary hover:bg-primary/90"
                            : customer?.role === (USER_ROLE.CUSTOMER as string)
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-purple-500 hover:bg-purple-600",
                        ),
                        "capitalize")
                      }
                    >
                      {customer?.role || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer?.email || "N/A"}</TableCell>
                  <TableCell>
                    {customer?.profile?.address[0]?.phoneNumber || "N/A"}
                  </TableCell>
                  <TableCell>
                    {customer?.profile?.address[0]?.address &&
                    customer?.profile?.address[0]?.area &&
                    customer?.profile?.address[0]?.city &&
                    customer?.profile?.address[0]?.street
                      ? customer?.profile?.address[0]?.address +
                        ", " +
                        customer?.profile?.address[0]?.area +
                        ", " +
                        customer?.profile?.address[0]?.city +
                        ", " +
                        customer?.profile?.address[0]?.street
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {format(new Date(customer?.createdAt), "dd-MMMM-yyyy ") ||
                      "N/A"}
                  </TableCell>
                  <TableCell>{customer?.status}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <EllipsisVertical size={20} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40">
                        <DropdownMenuItem>
                          <BiLockAlt />
                          Block
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">
                          <Trash2 /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-lg text-gray-600"
                >
                  No customers found at the moment.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter className="bg-gray-100">
            <TableRow>
              <TableCell colSpan={6}>
                Total {customers?.data?.meta?.total} Customers
              </TableCell>
              <TableCell colSpan={3} className="text-right">
                <Pagination
                  currentPage={currentPage}
                  totalPages={customers?.data?.meta?.page}
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

export default AdminAllCustomers;
