import { cn } from "@/lib/utils";

const Status = ({ status }: { status: string }) => {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-200 text-gray-700";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-indigo-100 text-indigo-800";
      case "verified":
        return "bg-emerald-100 text-emerald-800";
      case "block":
        return "bg-rose-100 text-rose-800";
      case "deleted":
        return "bg-red-100 text-red-800";
      case "in-stock":
        return "bg-green-100 text-green-800";
      case "out-of-stock":
        return "bg-gray-100 text-gray-800";
      case "out-of-stock":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "unpaid":
        return "bg-red-100 text-red-800";

      // for user roles
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
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-sm capitalize",
        getStatusBadge(status),
      )}
    >
      {status}
    </span>
  );
};

export default Status;
