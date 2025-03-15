import RatingStars from "@/components/ui/rating";
import { TReview } from "@/types/common";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

const SingleProductReview = ({ review }: { review: TReview }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      {/* Reviewer Info */}
      <div className="flex items-center space-x-4">
        <Image
          alt={review?.name || "Reviewer photo"}
          width={48}
          height={48}
          src={review?.photo || "/user-avatar.jpg"}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-semibold capitalize text-gray-900">
            {review?.name || "Jone De"}
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="flex">
              <RatingStars rating={review?.rating} />
            </div>
            <span className="font-medium">{review?.rating.toFixed(1)}</span>
            <span>
              •{" "}
              {formatDistanceToNow(new Date(review.createdAt as string), {
                addSuffix: true,
                includeSeconds: true,
              }).replace(/^about /, "")}
            </span>
          </div>
        </div>
      </div>

      {/* Review Comment */}
      <div className="mt-3 w-full lg:w-3/4">
        <p className="leading-relaxed text-gray-700">{review?.message}</p>
      </div>
    </div>
  );
};

export default SingleProductReview;
