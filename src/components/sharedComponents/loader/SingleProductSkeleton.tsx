import { Skeleton } from "@/components/ui/skeleton";

const SingleProductImagesSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Main Image Skeleton */}
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="relative h-[400px] w-full overflow-hidden rounded-xl" />

      {/* Thumbnails Skeleton */}
      <div className="grid grid-cols-5 gap-2">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
};

const SingleProductDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Title Skeleton */}
      <Skeleton className="h-8 w-1/2 rounded" />
      {/* Price Skeleton */}
      <Skeleton className="h-6 w-1/3 rounded" />
      {/* Description Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </div>
      {/* Buttons Skeleton */}
      <div className="flex gap-4">
        <Skeleton className="h-10 flex-1 rounded" />
        <Skeleton className="h-10 flex-1 rounded" />
      </div>
    </div>
  );
};

const SingleProductSkeleton = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        {/* Product Images Skeleton */}
        <SingleProductImagesSkeleton />

        {/* Product Details Skeleton */}
        <SingleProductDetailsSkeleton />
      </div>
    </div>
  );
};

export default SingleProductSkeleton;
