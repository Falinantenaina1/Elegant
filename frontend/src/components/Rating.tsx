import type { Review } from "@/types";
import { Rating } from "@smastrom/react-rating";

type RatingProps = {
  averageRating: number;
  reviews: Review[];
  readOnly?: boolean;
};

export const ShowRating = ({
  averageRating = 0,
  reviews = [],
  readOnly = false,
}: RatingProps) => {
  return (
    <div className="flex items-center gap-x-1">
      <Rating value={averageRating} readOnly={readOnly} className="max-w-30" />
      <div>
        {reviews.length} review
        {reviews.length > 1 ? "s" : ""}
      </div>
    </div>
  );
};
