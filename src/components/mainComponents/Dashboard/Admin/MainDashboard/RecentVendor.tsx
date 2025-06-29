"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Status from "@/components/ui/status";
import { demoVendors } from "@/data/vendors";
import { TStatus, TVendor } from "@/types/common";
import {
  Copy,
  EllipsisVertical,
  Eye,
  LucideStore,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiLockAlt } from "react-icons/bi";
import { toast } from "react-toastify";

const RecentVendor = ({
  recentVendors = demoVendors as TVendor[],
}: {
  recentVendors?: TVendor[];
}) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="mx-8 my-2">
          <CardTitle className="flex pb-1 text-xl md:text-2xl">
            <LucideStore className="mr-2 text-primary" /> Recent Vendors
          </CardTitle>

          <CardDescription>
            Latest registered vendors in the system
          </CardDescription>
        </div>
        <Link href="/admin/vendors">
          <Button variant="outline">View All</Button>
        </Link>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3">Vendor</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentVendors?.map((vendor) => (
              <tr key={vendor._id} className="border-b hover:bg-gray-50">
                <td className="flex items-center gap-3 px-4 py-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                    <Image
                      src={vendor.storeLogo || "/user-avatar.jpg"}
                      alt="Profile Photo"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <span
                    className="cursor-pointer text-lg font-medium text-gray-800"
                    onClick={() => router.push(`/shop/${vendor.storeName}`)}
                  >
                    {vendor.storeName}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{vendor.email}</td>
                <td className="px-4 py-3">
                  <Status status={vendor.status} />
                </td>
                <td className="px-4 py-3">
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
                        onClick={() => router.push(`/shop/${vendor.storeName}`)}
                      >
                        <Eye className="h-4 w-4" />
                        Details
                      </DropdownMenuItem>
                      {vendor.status === TStatus.INACTIVE ? (
                        <DropdownMenuItem>
                          <ShieldCheck className="h-4 w-4" />
                          Make Active
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem disabled>
                          <BiLockAlt className="h-4 w-4" />
                          Block
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem disabled className="text-red-500">
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default RecentVendor;
