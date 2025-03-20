import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RatingStars from "@/components/ui/rating";
import { TReview } from "@/types/common";
import { formatDistanceToNow } from "date-fns";
import { LucideMessageCircle } from "lucide-react";

const VendorDashboardMainReviewsCard = ({
  reviews,
}: {
  reviews: TReview[];
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="mb-1 flex items-center text-xl md:text-2xl">
          <LucideMessageCircle className="mr-2 h-6 w-6 text-primary" />
          Customer Reviews
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Recent product feedback from customers
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {reviews?.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-lg border bg-background p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between space-y-2">
                <div>
                  <p className="pb-1 text-base font-semibold">{review.name}</p>
                  <RatingStars rating={review.rating || 0} />
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(review.createdAt as string), {
                    addSuffix: true,
                  }).replace(/^about /, "")}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{review.message}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            No reviews available.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default VendorDashboardMainReviewsCard;
