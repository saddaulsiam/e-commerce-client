"use client";

import { useEffect, useState } from "react";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  FieldValues,
} from "react-hook-form";
import Select from "react-select/creatable";
import { toast } from "react-toastify";
import { Plus, Trash2 } from "lucide-react";

import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
} from "@/redux/features/categories/categoriesApi";
import { TCategory, TSubcategory } from "@/types/common";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Type for category options in react-select
interface CategoryOption {
  value: string;
  label: string;
}

// Type for form data
interface FormData {
  name: string;
  subcategories: {
    name: string;
    href: string;
    subcategories: { name: string; href: string }[];
  }[];
}

export default function AdminCreateCategory() {
  // Fetch main categories
  const { data: mainCategories } = useGetCategoriesQuery(undefined);
  const [createNewCategory] = useCreateCategoryMutation();

  // Options for Select
  const [mainCategoriesOptions, setMainCategoriesOptions] = useState<
    CategoryOption[]
  >([]);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState<
    CategoryOption[]
  >([]);

  // React Hook Form
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      subcategories: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "subcategories",
  });

  useEffect(() => {
    if (mainCategories?.data) {
      setMainCategoriesOptions(
        mainCategories.data.map((i: TCategory) => ({
          value: i.name,
          label: i.name,
        })),
      );
    }
  }, [mainCategories]);

  // Handle selecting a main category
  const handleCategoryChange = (selectedOption: CategoryOption | null) => {
    setValue("name", selectedOption?.value || "");

    const subcategories =
      mainCategories?.data.find(
        (category: TCategory) => category.name === selectedOption?.value,
      )?.subcategories || [];

    setSubCategoriesOptions(
      subcategories.map((subCategory: TSubcategory) => ({
        value: subCategory.name,
        label: subCategory.name,
      })),
    );
  };

  // Handle selecting a subcategory
  const handleSubCategoryChange = (
    selectedOption: CategoryOption | null,
    index: number,
  ) => {
    setValue(`subcategories.${index}.name`, selectedOption?.value || "");
  };

  // Add nested subcategory
  const addNestedSubcategory = (index: number) => {
    const nestedSubcategory = { name: "", href: "" };
    const currentSubcategories = fields[index].subcategories || [];
    update(index, {
      ...fields[index],
      subcategories: [...currentSubcategories, nestedSubcategory],
    });
  };

  // Remove nested subcategory
  const removeNestedSubcategory = (subIndex: number, parentIndex: number) => {
    const updatedSubcategories =
      fields[parentIndex].subcategories?.filter((_, i) => i !== subIndex) || [];
    update(parentIndex, {
      ...fields[parentIndex],
      subcategories: updatedSubcategories,
    });
  };

  // Form submit
  const submit: SubmitHandler<FormData> = async (data: FieldValues) => {
    try {
      const res = await createNewCategory(data).unwrap();
      if (res.success) {
        toast.success(res.message);
        reset();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4">
      <Card className="border shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-xl font-bold text-gray-800">
            Create New Category
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8 py-6">
          <form onSubmit={handleSubmit(submit)} className="space-y-8">
            {/* Main Category Select */}
            <div className="space-y-2">
              <Label htmlFor="category-select">Category *</Label>
              <Select<CategoryOption>
                options={mainCategoriesOptions}
                isClearable
                isSearchable
                required
                placeholder="Select or type a category"
                onChange={handleCategoryChange}
                className="text-gray-700"
                inputId="category-select"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <Separator />

            {/* Subcategories */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Subcategories
              </h3>

              {fields.length === 0 && (
                <p className="text-sm text-gray-500">
                  No subcategories added yet.
                </p>
              )}

              <div className="space-y-4">
                {fields.map((item, index) => (
                  <Card
                    key={item.id}
                    className="border bg-gray-50 shadow-sm transition hover:bg-gray-100"
                  >
                    <CardContent className="space-y-4 p-4">
                      <div className="flex flex-col gap-4 md:flex-row">
                        <div className="flex-1 space-y-2">
                          <Label>Subcategory Name *</Label>
                          <Select<CategoryOption>
                            options={subCategoriesOptions}
                            isClearable
                            isSearchable
                            required
                            placeholder="Select or type a subcategory"
                            onChange={(selectedOption) =>
                              handleSubCategoryChange(selectedOption, index)
                            }
                            className="text-gray-700"
                          />
                        </div>

                        <div className="flex-1 space-y-2">
                          <Label>Subcategory URL</Label>
                          <Input
                            {...register(`subcategories.${index}.href`)}
                            placeholder="/category/subcategory"
                          />
                        </div>

                        <div className="flex items-end">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </div>

                      {/* Nested Subcategories */}
                      <div className="mt-4 space-y-2">
                        <Label>Nested Subcategories *</Label>

                        {item.subcategories?.length > 0 ? (
                          <div className="space-y-2">
                            {item.subcategories.map((sub, subIndex) => (
                              <div
                                key={subIndex}
                                className="flex flex-col items-start gap-3 rounded-md border bg-white p-3 shadow-sm md:flex-row md:items-center"
                              >
                                <Input
                                  {...register(
                                    `subcategories.${index}.subcategories.${subIndex}.name`,
                                    { required: "Name required" },
                                  )}
                                  placeholder="Name"
                                />
                                <Input
                                  {...register(
                                    `subcategories.${index}.subcategories.${subIndex}.href`,
                                    { required: "URL required" },
                                  )}
                                  placeholder="/category/subcategory/nested"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() =>
                                    removeNestedSubcategory(subIndex, index)
                                  }
                                >
                                  <Trash2 size={18} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">
                            No nested subcategories.
                          </p>
                        )}

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addNestedSubcategory(index)}
                        >
                          <Plus size={16} className="mr-1" />
                          Add Nested Subcategory
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  append({
                    name: "",
                    href: "",
                    subcategories: [{ name: "", href: "" }],
                  })
                }
              >
                <Plus size={16} className="mr-1" />
                Add Subcategory
              </Button>
            </div>

            <Separator />

            <Button type="submit" className="w-full">
              Create Category
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
