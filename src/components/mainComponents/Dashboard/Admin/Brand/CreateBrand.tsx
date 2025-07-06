"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBrandsMutation } from "@/redux/features/brands/brandsApi";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Brand",
};
const CreateBrand = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [createBrand] = useCreateBrandsMutation();

  const submit = async (data: FieldValues) => {
    const res = await createBrand(data).unwrap();
    if (res.success) {
      toast.success(res.message);
      reset();
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h3 className="my-5 text-2xl font-semibold text-gray-700">
        Create New Brand
      </h3>
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(submit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Brand name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">
                    {String(errors.name.message)}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="id">Logo URL *</Label>
                <Input
                  id="id"
                  placeholder="Logo URL"
                  {...register("logo", { required: "Logo is required" })}
                />
                {errors.logo && (
                  <p className="text-sm text-red-500">
                    {String(errors.logo.message)}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Description"
                {...register("description")}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-orange-600"
            >
              Create Brand
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBrand;
