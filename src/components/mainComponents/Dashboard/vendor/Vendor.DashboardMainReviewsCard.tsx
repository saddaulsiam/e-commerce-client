import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RatingStars from "@/components/ui/rating";
import { formatDistanceToNow } from "date-fns";
import { LucideMessageCircle } from "lucide-react";

const VendorDashboardMainReviewsCard = ({ reviews }: any) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-1 flex">
          <LucideMessageCircle className="mr-2 h-6 w-6 text-primary" />
          Customer Reviews
        </CardTitle>
        <CardDescription>Recent product feedback</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {reviews?.map((review: any) => (
          <div
            key={review._id}
            className="rounded-lg border bg-background p-4 transition hover:bg-muted/50"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <RatingStars rating={4.4} />
              </div>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(review.createdAt), {
                  addSuffix: true,
                  includeSeconds: true,
                }).replace(/^about /, "")}
              </span>
            </div>
            <p className="text-sm">{review.comment}</p>
            <Badge variant="secondary" className="mt-2">
              {review.product}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default VendorDashboardMainReviewsCard;
