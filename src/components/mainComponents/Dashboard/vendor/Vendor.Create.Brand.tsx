import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

// local
import { useCreateBrandsMutation } from "../../../../redux/features/brands/brandsApi";
import { Button } from "@/components/ui/button";

const VendorCreateBrand = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formError },
  } = useForm();

  const [createBrand, { isError, error }] = useCreateBrandsMutation();

  const submit = (data) => {
    createBrand(data).then((res) => {
      if (res?.data?.status === "success") {
        toast.success(res.data.message);
        reset();
      }
    });
  };

  if (isError) {
    console.log(error.data);
    toast.error(error.data.message);
    toast.error(error.data?.error?.message?.split(":")[2]);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <h3 className="my-5 text-2xl font-semibold text-my-gray-200">
          Create New Brand
        </h3>
      </div>
      <div className="rounded-md bg-white p-10">
        <form onSubmit={handleSubmit(submit)}>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-my-gray-200">
                Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Brand name"
                className="input input-bordered h-12 rounded-md border px-3"
                {...register("name", { required: true })}
              />
              {formError?.name?.type === "required" && (
                <p className="text-secondary">Name is required</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-my-gray-200">
                Email *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter the brand email"
                className="input input-bordered h-12 rounded-md border px-3"
                {...register("email", { required: true })}
              />
              {formError?.email && (
                <p className="text-secondary">email is required</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="website" className="text-my-gray-200">
                Website *
              </label>
              <input
                type="text"
                name="website"
                id="website"
                placeholder="Brand website"
                className="input input-bordered h-12 rounded-md border px-3"
                {...register("website", { required: true })}
              />
              {formError?.website?.type === "required" && (
                <p className="text-secondary">Website is required</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="location" className="text-my-gray-200">
                Location (Optional)
              </label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Brand location"
                className="input input-bordered h-12 rounded-md border px-3"
                {...register("location")}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              cols=""
              rows="7"
              className="rounded-md border p-3 ring-offset-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              {...register("description")}
            />
          </div>

          <Button
            type="submit"
            className="btn mt-10 border-none bg-primary hover:bg-red-600"
          >
            Save Product
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VendorCreateBrand;
