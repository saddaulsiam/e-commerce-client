"use client";

import { Pagination } from "@/components/sharedComponents";
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
  useChangeUserStatusMutation,
  useGetAllUsersQuery,
} from "@/redux/features/user/userApi";
import { TStatus, TUser } from "@/types/common";
import { format } from "date-fns";
import {
  EllipsisVertical,
  Lock,
  ShieldCheck,
  Trash2,
  Unlock,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsPeople } from "react-icons/bs";
import { toast } from "react-toastify";

const AdminAllCustomers = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [changeCustomerStatus] = useChangeUserStatusMutation();

  // Fetch all customers with pagination
  const { data: customers } = useGetAllUsersQuery({
    page: currentPage,
    limit: 20,
    role: "customer",
  });

  const handleChangeStatus = async (id: string, status: string) => {
    const res = await changeCustomerStatus({ id, status }).unwrap();
    if (res.success) {
      toast.success(`Vendor status changed to ${status}`);
      router.refresh();
    }
  };

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
                    <Status status={customer?.role} />
                  </TableCell>
                  <TableCell>{customer?.email || "N/A"}</TableCell>
                  <TableCell>
                    {customer?.profile?.address[0]?.phoneNumber || "N/A"}
                  </TableCell>
                  <TableCell>
                    {customer?.profile?.address[0]?.region &&
                    customer?.profile?.address[0]?.area &&
                    customer?.profile?.address[0]?.city &&
                    customer?.profile?.address[0]?.street
                      ? customer?.profile?.address[0]?.region +
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
                  <TableCell>
                    <Status status={customer?.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <EllipsisVertical size={20} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40">
                        {customer.status === TStatus.BLOCK ? (
                          <DropdownMenuItem
                            onClick={() =>
                              handleChangeStatus(customer._id, TStatus.ACTIVE)
                            }
                          >
                            <Unlock />
                            Unblock
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() =>
                              handleChangeStatus(customer._id, TStatus.BLOCK)
                            }
                          >
                            <Lock />
                            Block
                          </DropdownMenuItem>
                        )}
                        {customer.status === TStatus.DELETED ? (
                          <DropdownMenuItem
                            onClick={() =>
                              handleChangeStatus(customer._id, TStatus.ACTIVE)
                            }
                          >
                            <ShieldCheck className="h-4 w-4" />
                            Make Active
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() =>
                              handleChangeStatus(customer._id, TStatus.DELETED)
                            }
                          >
                            <Trash2 /> Delete
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
