import { Skeleton } from "@/components/ui/skeleton";

const CustomerProfileSkeleton = () => {
  return (
    <div className="mb-10 rounded-lg bg-white px-4 py-6 shadow-sm sm:p-10">
      {/* Header Skeleton */}
      <div className="mb-6 flex items-center justify-between">
        {/* Instead of the title with an icon, show a skeleton placeholder */}
        <Skeleton className="h-8 w-48" />
        {/* Skeleton for the edit button */}
        <Skeleton className="h-8 w-24" />
      </div>

      {/* Profile & Order Summary Skeleton */}
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Profile Card Skeleton */}
        <div className="col-span-2 flex items-center rounded-lg bg-slate-100 p-5 shadow-md sm:col-span-1">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="ml-4 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Order Summary Skeleton */}
        <div className="col-span-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-lg bg-slate-100 p-4 shadow-md"
            >
              <Skeleton className="h-6 w-10" />
              <Skeleton className="mt-2 h-4 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Personal Information Skeleton */}
      <div className="rounded-lg bg-slate-100 p-5 shadow-md">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Full Name", "Phone", "Date Of Birth", "Email"].map(
            (label, index) => (
              <div key={index}>
                <Skeleton className="h-4 w-16" />
                <Skeleton className="mt-2 h-5 w-full" />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfileSkeleton;
