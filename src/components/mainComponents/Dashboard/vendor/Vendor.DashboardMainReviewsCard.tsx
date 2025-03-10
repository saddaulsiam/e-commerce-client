import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RatingStars from "@/components/ui/rating";
import { LucideMessageCircle, StarIcon } from "lucide-react";

const VendorDashboardMainReviewsCard = () => {
  // Sample fake data for demonstration
  const reviews = [
    {
      id: 1,
      product: "Wireless Headphones",
      rating: 4,
      comment: "Excellent sound quality!",
    },
    {
      id: 2,
      product: "Smart Watch",
      rating: 5,
      comment: "Best smartwatch I've owned",
    },
    {
      id: 3,
      product: "Portable Speaker",
      rating: 3,
      comment: "Good but battery life could be better",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="mb-1 flex">
              <LucideMessageCircle className="mr-2 h-6 w-6 text-primary" />
              Customer Reviews
            </CardTitle>
            <CardDescription>Recent product feedback</CardDescription>
          </div>
          <Badge className="flex items-center gap-1">
            <StarIcon className="h-4 w-4 fill-current" />
            4.8
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.map((review: any) => (
          <div
            key={review.id}
            className="rounded-lg border bg-background p-4 transition hover:bg-muted/50"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <RatingStars rating={4.4} />
              </div>
              <span className="text-sm text-muted-foreground">2h ago</span>
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
