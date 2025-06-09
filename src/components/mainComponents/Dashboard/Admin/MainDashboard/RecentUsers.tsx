import { Button } from "@/components/ui/button";
import { TUser } from "@/types/common";
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
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-6 flex justify-between">
        <h2 className="text-xl font-bold text-gray-800">Recent Users</h2>
        <Link href="/admin/customers">
          <Button variant="link">View All</Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b-2">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentCustomers?.map((user: TUser) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="relative h-16 w-16">
                    <Image
                      layout="fill"
                      className="rounded-full"
                      src={user?.profile?.photo || "/user-avatar.jpg"}
                      alt="User Image"
                      priority
                    />
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${getRoleBadge(user.role)}`}
                  >
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-sm capitalize ${getStatusBadge(user.status)}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:bg-blue-100 hover:text-blue-800"
                    onClick={() => {
                      navigator.clipboard.writeText(user._id);
                      toast.success("User ID copied to clipboard");
                    }}
                  >
                    Copy ID
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsers;
