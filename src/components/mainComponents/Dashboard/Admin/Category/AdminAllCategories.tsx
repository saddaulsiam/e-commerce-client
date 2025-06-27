"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import { TCategory } from "@/types/common";
import AdminCategoryItem from "./AdminCategoryItem";

export default function AdminCategories() {
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetCategoriesQuery(undefined);

  if (isLoading) {
    return (
      <div className="mx-auto mt-6 max-w-3xl space-y-4 p-4">
        <Skeleton className="h-8 w-1/3 rounded" />
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-14 rounded" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto mt-6 max-w-3xl p-4">
        <Alert variant="destructive">
          <AlertTitle>Error loading categories</AlertTitle>
          <AlertDescription>
            Please check your internet connection or try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">All Categories</h2>
        <p className="text-sm text-gray-500">
          View and manage all categories and their.
        </p>
      </div>

      {categories?.data?.length > 0 ? (
        categories.data.map((category: TCategory) => (
          <Card
            key={category._id}
            className="border border-gray-200 shadow-sm transition hover:shadow-md"
          >
            <CardHeader className="border-b bg-gray-50 px-4 py-3">
              <CardTitle className="text-base font-semibold text-gray-800">
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <AdminCategoryItem item={category} level={0} />
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="py-6 text-center text-gray-500">
            <p>No categories available.</p>
            <p className="text-sm">Please add new categories to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
