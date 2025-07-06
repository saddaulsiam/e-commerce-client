"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMakeAdminMutation } from "@/redux/features/admin/adminApi";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CreateNewAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [makeAdmin, { isLoading }] = useMakeAdminMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await makeAdmin(data.email).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(
        error.data.message || "Failed to create admin. Please try again.",
      );
    }
  };
  return (
    <>
      <div className="flex min-h-[calc(100vh-88px)] items-center justify-center">
        <Card className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h2 className="text-center text-3xl font-semibold">
            Create New Admin
          </h2>
          <p className="mb-4 text-center text-sm text-gray-500">
            Sign up to get started
          </p>

          <div className="rounded-lg border p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email", { required: true })}
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  className="mt-1"
                />
              </div>

              {errors.email && (
                <span className="text-xs text-red-500">Email is required</span>
              )}

              <Button
                type="submit"
                className="mt-4 w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating Admin..." : "Create Admin"}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CreateNewAdmin;
