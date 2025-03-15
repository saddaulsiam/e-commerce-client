import { Button } from "@/components/ui/button";
import { useMakeReviewMutation } from "@/redux/features/product/productApi";
import { useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/types/common";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";

type ReviewFormData = {
  message: string;
};

const SingleProductReviewForm = ({ product }: { product: TProduct }) => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const { user } = useAppSelector(({ state }) => state.auth);
  const [makeReview] = useMakeReviewMutation();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormData>();

  const onSubmit: SubmitHandler<ReviewFormData> = async (data) => {
    if (rating === 0) {
      toast.warn("Please select a rating!");
      return;
    }
    const reviewData = {
      rating,
      message: data.message,
      name: user?.displayName,
      photo: user?.profile.photo,
    };

    const res = await makeReview({
      id: product._id,
      data: reviewData,
    }).unwrap();

    if (res.success) {
      toast.success(res.message);
      setRating(0);
      reset();
    }
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Write a Review</h3>
      <form
        onSubmit={handleSubmit(onSubmit)} // Prevents page reload automatically
        className="space-y-4"
      >
        {/* Selectable Star Rating */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(null)}
              onClick={() => setRating(star)}
              className="cursor-pointer text-xl transition-all duration-200"
            >
              {star <= (hoveredStar ?? rating) ? (
                <AiFillStar className="text-yellow-500" />
              ) : (
                <AiOutlineStar className="text-gray-300" />
              )}
            </span>
          ))}
        </div>

        {/* Review Text */}
        <textarea
          {...register("message", { required: "Review cannot be empty" })}
          placeholder="Share your thoughts..."
          className="w-full rounded-lg border p-3 focus:border-primary focus:ring-primary"
          rows={4}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}

        <Button type="submit" className="rounded-lg">
          Submit Review
        </Button>
      </form>
    </div>
  );
};

export default SingleProductReviewForm;
