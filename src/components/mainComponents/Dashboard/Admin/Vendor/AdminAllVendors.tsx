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
  useChangeVendorStatusMutation,
  useGetAllVendorsQuery,
} from "@/redux/features/vendor/vendorApi";
import { TStatus, TVendor } from "@/types/common";
import { format } from "date-fns";
import {
  Copy,
  EllipsisVertical,
  Eye,
  Lock,
  ShieldCheck,
  Store,
  Trash2,
  Unlock,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminAllVendors = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [changeVendorStatus] = useChangeVendorStatusMutation();

  const { data: vendors } = useGetAllVendorsQuery({
    page: currentPage,
    limit: 20,
  });

  const handleChangeStatus = async (id: string, status: string) => {
    const res = await changeVendorStatus({ id, status }).unwrap();
    if (res.success) {
      toast.success(`Vendor status changed to ${status}`);
      router.refresh();
    }
  };

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
                      ? `${vendor.address.street}, ${vendor.address.area}, ${vendor.address.city}, ${vendor.address.region}`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {vendor?.createdAt
                      ? format(new Date(vendor.createdAt), "dd-MMMM-yyyy")
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Status status={vendor?.status} />
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
                          onClick={() => {
                            navigator.clipboard.writeText(vendor._id);
                            toast.success("Copied to clipboard");
                          }}
                        >
                          <Copy className="h-4 w-4" />
                          Copy UID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/shop/${vendor.storeName}`)
                          }
                        >
                          <Eye className="h-4 w-4" />
                          Details
                        </DropdownMenuItem>
                        {vendor.status === TStatus.INACTIVE && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleChangeStatus(vendor._id, TStatus.ACTIVE)
                            }
                          >
                            <ShieldCheck className="h-4 w-4" />
                            Make Active
                          </DropdownMenuItem>
                        )}
                        {vendor.status === TStatus.BLOCK ? (
                          <DropdownMenuItem
                            onClick={() =>
                              handleChangeStatus(vendor._id, TStatus.ACTIVE)
                            }
                          >
                            <Unlock />
                            Unblock
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() =>
                              handleChangeStatus(vendor._id, TStatus.BLOCK)
                            }
                          >
                            <Lock />
                            Block
                          </DropdownMenuItem>
                        )}
                        {vendor.status === TStatus.DELETED ? (
                          <DropdownMenuItem
                            onClick={() =>
                              handleChangeStatus(vendor._id, TStatus.ACTIVE)
                            }
                          >
                            <ShieldCheck className="h-4 w-4" />
                            Make Active
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() =>
                              handleChangeStatus(vendor._id, TStatus.DELETED)
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
