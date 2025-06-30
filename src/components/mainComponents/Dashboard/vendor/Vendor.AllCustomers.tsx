"use client";

import { Pagination } from "@/components/sharedComponents";
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
import { useGetVendorCustomersQuery } from "@/redux/features/vendor/vendorApi";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types/common";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { BsPeople } from "react-icons/bs";

const VendorAllCustomers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAppSelector(({ state }) => state.auth);

  const { data: customers } = useGetVendorCustomersQuery({
    limit: 8,
    page: currentPage,
    vendorId: user?.vendor?._id,
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
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Joined Date</TableHead>
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
                  <TableCell>{customer?.email}</TableCell>
                  <TableCell>
                    {customer?.profile?.address[0]?.phoneNumber}
                  </TableCell>
                  <TableCell>
                    {customer?.profile?.address[0]?.street},
                    {customer?.profile?.address[0]?.area},
                    {customer?.profile?.address[0]?.city},
                    {customer?.profile?.address[0]?.region}
                  </TableCell>
                  <TableCell>
                    {format(new Date(customer?.createdAt), "dd-MMMM-yyyy ")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-lg text-gray-600"
                >
                  No customers found at the moment.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter className="bg-gray-100">
            <TableRow>
              <TableCell colSpan={4}>
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

export default VendorAllCustomers;
