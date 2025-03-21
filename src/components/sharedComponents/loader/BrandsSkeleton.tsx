import { Skeleton } from "@/components/ui/skeleton";

const BrandsSkeleton = () => {
  // Adjust the number of skeleton cards as needed.
  const skeletonArray = Array.from({ length: 5 });

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-5">
      {skeletonArray.map((_, index) => (
        <div
          key={index}
          className="rounded bg-white shadow transition-shadow duration-300 hover:shadow-lg"
        >
          <div className="flex flex-col items-center space-y-4 p-6">
            {/* Logo Skeleton */}
            <Skeleton className="mb-4 h-8 w-16" />
            {/* Title Skeleton */}
            <Skeleton className="mb-2 h-6 w-24" />
            {/* Description Skeleton */}
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandsSkeleton;
