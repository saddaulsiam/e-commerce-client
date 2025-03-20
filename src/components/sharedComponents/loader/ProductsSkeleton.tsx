import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const ProductsSkeleton = ({
  number = 5,
  classname,
}: {
  number?: number;
  classname?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 lg:grid-cols-5",
        classname,
      )}
    >
      {[...Array(number)].map((_, index) => (
        <div
          key={index}
          className="relative rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md"
        >
          {/* Skeleton Image Section */}
          <div className="group relative w-full overflow-hidden rounded-t-lg bg-gray-200">
            <Skeleton className="h-32 w-full md:h-52" />
          </div>

          {/* Skeleton Product Details */}
          <div className="p-1.5 md:p-4">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="mt-2 h-4 w-1/2" />
            <div className="mt-2 flex items-center space-x-2">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-5 w-1/4" />
            </div>
          </div>

          {/* Skeleton Buttons Section */}
          <div className="flex">
            <Skeleton className="h-10 w-1/2 rounded-bl-lg" />
            <Skeleton className="h-10 w-1/2 rounded-br-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductsSkeleton;
