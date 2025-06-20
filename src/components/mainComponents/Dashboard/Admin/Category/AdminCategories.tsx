"use client";

import AdminCategoryItem from "@/components/mainComponents/Dashboard/Admin/Category/AdminCategoryItem";
import { useGetCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import { TCategory } from "@/types/common";

const AdminCategories = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetCategoriesQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="text-gray-500">Loading categories...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="text-red-500">Error loading categories</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-3">
      <h2 className="my-5 text-2xl font-semibold text-gray-700">
        All Categories
      </h2>
      {categories?.data && categories.data.length > 0 ? (
        categories.data.map((category: TCategory) => (
          <div
            key={category._id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow"
          >
            <AdminCategoryItem item={category} />
          </div>
        ))
      ) : (
        <p className="text-gray-600">No categories available</p>
      )}
    </div>
  );
};

export default AdminCategories;
