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
import { cn } from "@/lib/utils";
import { useGetAllVendorsQuery } from "@/redux/features/vendor/vendorApi";
import { TUser, TVendor } from "@/types/common";
import { format } from "date-fns";
import { EllipsisVertical, Eye, Store, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiLockAlt } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";

const AdminAllVendors = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: vendors } = useGetAllVendorsQuery({
    page: currentPage,
    limit: 20,
  });

  return (
    <Card className="md:m-6">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold text-slate-700 md:text-2xl">
          <Store className="mr-2 text-primary" />
          Vendors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="overflow-x-auto">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Image</TableHead>
              <TableHead>Store Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors?.data?.data?.length > 0 ? (
              vendors?.data?.data?.map((vendor: TVendor) => (
                <TableRow key={vendor?._id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="relative h-16 w-16">
                      <Image
                        layout="fill"
                        className="rounded-full"
                        src={vendor?.storeLogo || "/user-avatar.jpg"}
                        alt="Customer Image"
                        priority
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {vendor?.storeName}
                  </TableCell>
                  <TableCell>{vendor?.email || "N/A"}</TableCell>
                  <TableCell>{vendor?.phoneNumber || "N/A"}</TableCell>
                  <TableCell>
                    {vendor?.address
                      ? `${vendor.address.street}, ${vendor.address.area}, ${vendor.address.city}, ${vendor.address.street}`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {vendor?.createdAt
                      ? format(new Date(vendor.createdAt), "dd-MMMM-yyyy")
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        (cn(
                          vendor.status === "inactive"
                            ? "bg-primary hover:bg-primary/90"
                            : vendor.status === "active"
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600",
                        ),
                        "capitalize")
                      }
                    >
                      {vendor?.status || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <EllipsisVertical size={20} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40">
                        <DropdownMenuItem>
                          <Link
                            className="flex"
                            href={`/shop/${vendor.storeName}`}
                          >
                            <Eye className="mr-2 h-5 w-5" />
                            Details
                          </Link>
                        </DropdownMenuItem>
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
                  No Vendors found at the moment.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter className="bg-gray-100">
            <TableRow>
              <TableCell colSpan={6}>
                Total {vendors?.data?.meta?.total} Vendors
              </TableCell>
              <TableCell colSpan={3} className="text-right">
                <Pagination
                  currentPage={currentPage}
                  totalPages={vendors?.data?.meta?.page}
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

export default AdminAllVendors;
