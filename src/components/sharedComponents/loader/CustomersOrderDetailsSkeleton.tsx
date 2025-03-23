"use client";

import { Skeleton } from "@/components/ui/skeleton";

const CustomersOrderDetailsSkeleton = () => {
  return (
    <div className="my-10 space-y-8">
      {/* Order Status */}
      <div className="rounded-md bg-white px-5 py-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex space-x-40">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-16 w-16 rounded-full" />
          </div>
        </div>
        <div className="mt-10 flex justify-end">
          <Skeleton className="h-6 w-60 rounded-full" />
        </div>
      </div>

      <div className="mt-8 space-y-6 rounded-lg bg-white p-6 shadow-sm">
        {/* Header Skeleton */}
        <div className="mb-6">
          <Skeleton className="mb-2 h-6 w-48 rounded" />
          <Skeleton className="h-4 w-32 rounded" />
        </div>

        {/* Skeleton for each sub order item */}
        <div className="space-y-6">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start justify-between rounded-lg border border-gray-100 p-4"
            >
              <div className="flex w-full items-center space-x-4">
                <Skeleton className="h-24 w-24 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40 rounded" />
                  <Skeleton className="h-4 w-28 rounded" />
                </div>
              </div>
              <div className="mt-4 w-full text-right">
                <Skeleton className="ml-auto h-4 w-24 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Skeleton */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-4 w-16 rounded" />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>
        </div>
      </div>

      {/* Shipping & Payment Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Shipping Address */}
        <section className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
          <Skeleton className="h-6 w-32 rounded" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-64 rounded" />
            <Skeleton className="h-4 w-48 rounded" />
            <Skeleton className="h-4 w-56 rounded" />
            <Skeleton className="h-4 w-40 rounded" />
          </div>
        </section>

        {/* Payment Summary */}
        <section className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
          <Skeleton className="h-6 w-32 rounded" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-4 w-12 rounded" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-4 w-12 rounded" />
            </div>
            <div className="flex justify-between border-t pt-3">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomersOrderDetailsSkeleton;
