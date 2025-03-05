"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/features/categories/categoriesApi";
import { TCategory, TSubcategory } from "@/types/common";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import Select from "react-select/creatable";
import { toast } from "react-toastify";

// Type for category options in Select
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

const AdminCreateCategory = () => {
  const { data: mainCategories } = useGetCategoriesQuery(undefined);
  const [createNewCategory] = useCreateCategoryMutation();

  // States for category select options
  const [mainCategoriesOptions, setMainCategoriesOptions] = useState<
    CategoryOption[]
  >([]);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState<
    CategoryOption[]
  >([]);

  useEffect(() => {
    if (mainCategories?.data) {
      setMainCategoriesOptions(
        mainCategories.data.map((i: TCategory) => ({
          value: i.name,
          label: i.name,
        })),
      );
    }
  }, [mainCategories?.data]);

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
      subcategories: [
        { name: "", href: "", subcategories: [{ name: "", href: "" }] },
      ],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "subcategories",
  });

  // Handle category selection change
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

  // Handle subcategory selection change
  const handleSubCategoryChange = (
    selectedOption: CategoryOption | null,
    index: number,
  ) => {
    setValue(`subcategories.${index}.name`, selectedOption?.value || "");
  };

  // Form submission
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

  // Function to add a nested subcategory inside a subcategory
  const addNestedSubcategory = (index: number) => {
    const nestedSubcategory = { name: "", href: "" };
    const currentSubcategories = fields[index].subcategories || [];
    update(index, {
      ...fields[index],
      subcategories: [...currentSubcategories, nestedSubcategory],
    });
  };

  // Function to remove a nested subcategory
  const removeNestedSubcategory = (subIndex: number, parentIndex: number) => {
    const updatedSubcategories =
      fields[parentIndex].subcategories?.filter(
        (_, index) => index !== subIndex,
      ) || [];
    update(parentIndex, {
      ...fields[parentIndex],
      subcategories: updatedSubcategories,
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h3 className="my-5 text-2xl font-semibold text-gray-700">
        Create New Category
      </h3>
      <Card className="shadow-lg">
        <CardContent className="space-y-5 p-6">
          <form onSubmit={handleSubmit(submit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="category-select">Category *</Label>
              <Select<CategoryOption>
                options={mainCategoriesOptions}
                isClearable
                isSearchable
                required
                placeholder="Select or type a category"
                onChange={(selectedOption) =>
                  handleCategoryChange(selectedOption)
                }
                className="text-gray-700"
                inputId="category-select"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-700">
                Subcategories
              </h4>
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="space-y-4 rounded-md border bg-gray-50 p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`subcategories.${index}.name`}>
                        Subcategory Name *
                      </Label>
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
                        inputId={`subcategories.${index}.name`}
                      />
                      {errors.subcategories?.[index]?.name && (
                        <p className="text-sm text-red-500">
                          {errors.subcategories[index].name.message}
                        </p>
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`subcategories.${index}.href`}>
                        Subcategory URL
                      </Label>
                      <Input
                        {...register(`subcategories.${index}.href`)}
                        placeholder="/category/subcategory"
                        className="input-field"
                      />
                      {errors.subcategories?.[index]?.href && (
                        <p className="text-sm text-red-500">
                          {errors.subcategories[index].href.message}
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  {/* Nested Subcategories */}
                  <div className="mt-3 space-y-2">
                    <h5 className="text-md font-medium text-gray-700">
                      Nested Subcategories
                    </h5>
                    <div className="flex flex-col gap-3">
                      {item.subcategories?.map((sub, subIndex) => (
                        <div
                          key={subIndex}
                          className="flex items-center gap-3 rounded-md border bg-white p-3 shadow-sm"
                        >
                          <Input
                            {...register(
                              `subcategories.${index}.subcategories.${subIndex}.name`,
                              {
                                required: "Nested Subcategory Name is required",
                              },
                            )}
                            placeholder="Nested Subcategory Name"
                          />
                          <Input
                            {...register(
                              `subcategories.${index}.subcategories.${subIndex}.href`,
                              {
                                required: "Nested Subcategory URL is required",
                              },
                            )}
                            placeholder="/category/subcategory/nested"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() =>
                              removeNestedSubcategory(subIndex, index)
                            }
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addNestedSubcategory(index)}
                    >
                      <Plus size={16} /> Add Nested Subcategory
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    name: "",
                    href: "",
                    subcategories: [{ name: "", href: "" }],
                  })
                }
              >
                <Plus size={16} /> Add Subcategory
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-orange-600"
            >
              Create Category
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCreateCategory;
