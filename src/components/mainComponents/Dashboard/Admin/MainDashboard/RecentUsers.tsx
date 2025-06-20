"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TUser } from "@/types/common";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const RecentUsers = ({ recentCustomers }: any) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "block":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "vendor":
        return "bg-blue-100 text-blue-800";
      case "customer":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="mx-8 my-2">
          <CardTitle className="flex pb-1 text-xl md:text-2xl">
            <Users className="mr-2 text-primary" /> Recent Users
          </CardTitle>

          <CardDescription>
            Latest registered users in the system
          </CardDescription>
        </div>
        <Link href="/admin/customers">
          <Button variant="outline">View All</Button>
        </Link>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="border-b">
            <tr className="text-gray-600">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentCustomers?.map((user: TUser) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="relative h-10 w-10">
                    <Image
                      src={user?.profile?.photo || "/user-avatar.jpg"}
                      alt="User Image"
                      layout="fill"
                      className="rounded-full object-cover"
                      priority
                    />
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getRoleBadge(user.role)}`}
                  >
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusBadge(user.status)}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-500 hover:bg-blue-100 hover:text-blue-800"
                    onClick={() => {
                      navigator.clipboard.writeText(user._id);
                      toast.success("User ID copied to clipboard");
                    }}
                  >
                    Copy UID
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default RecentUsers;
