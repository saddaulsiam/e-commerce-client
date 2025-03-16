import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import { TCategory } from "@/types/common";
import { useState } from "react";
import { Controller } from "react-hook-form";

interface CategorySelectProps {
  control: any;
  setValue: any;
  watch: any;
  placeholder: string;
  name: string;
}

const CategorySelect = ({
  control,
  setValue,
  watch,
  placeholder,
  name,
}: CategorySelectProps) => {
  const { data } = useGetCategoriesQuery("");
  const categories: TCategory[] = data?.data || [];

  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [nestedCategories, setNestedCategories] = useState<any[]>([]);
  const [step, setStep] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const selectedCategory = watch("mainCategory", "");
  const selectedSubCategory = watch("subcategory", "");
  const selectedNestedSubCategory = watch("nestedCategory", "");

  const getNestedCategoryName = () => {
    const found = nestedCategories.find(
      (sub) => sub.href === selectedNestedSubCategory,
    );
    return found ? found.name : selectedNestedSubCategory;
  };

  // Construct the display value using names
  const displayValue =
    selectedCategory && selectedSubCategory && selectedNestedSubCategory
      ? `${selectedCategory} > ${selectedSubCategory} > ${getNestedCategoryName()}`
      : selectedCategory && selectedSubCategory
        ? `${selectedCategory} > ${selectedSubCategory}`
        : selectedCategory
          ? `${selectedCategory}`
          : "";

  // Define options for the select dropdown
  const options: { value: string; label: string }[] = [];
  if (step === 0) {
    options.push(
      ...categories.map((cat) => ({ value: cat?.name, label: cat?.name })),
    );
  } else if (step === 1) {
    options.push(
      ...subCategories.map((sub) => ({ value: sub?.name, label: sub?.name })),
    );
  } else if (step === 2) {
    options.push(
      ...nestedCategories.map((subsub) => ({
        value: subsub?.href,
        label: subsub?.name,
      })),
    );
  }

  // Handle changes when a user selects a value
  const handleChange = (value: string) => {
    if (step === 0) {
      const selectedCat = categories.find((cat) => cat?.name === value);
      setValue("mainCategory", selectedCat?.name);
      setValue("subcategory", "");
      setValue("nestedCategory", "");
      setSubCategories(selectedCat?.subcategories || []);
      setStep(1);
      setOpen(true);
    } else if (step === 1) {
      const selectedSubCat = subCategories.find((sub) => sub?.name === value);
      setValue("subcategory", selectedSubCat?.name);
      setValue("nestedCategory", "");
      setNestedCategories(selectedSubCat?.subcategories || []);
      setStep(2);
      setOpen(true);
    } else if (step === 2) {
      // For nested mainCategory, set the href as the final value
      const nestedCategory = nestedCategories.find(
        (sub) => sub?.href === value,
      );
      setValue("nestedCategory", nestedCategory?.href);
      setStep(0);
      setOpen(false);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          open={open}
          onOpenChange={setOpen}
          onValueChange={(value: string) => {
            field.onChange(value);
            handleChange(value);
          }}
        >
          <SelectTrigger className="h-12">
            <SelectValue
              placeholder={
                placeholder ||
                "Main-Category > Subcategory > Nested-subcategory"
              }
            >
              {displayValue}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default CategorySelect;
