import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const RatingStars = ({ rating = 4 }: { rating: number }) => {
  const maxStars = 5;
  const safeRating = Math.max(0, Math.min(rating, maxStars)); // Ensure rating is between 0 and 5
  const filledStars = Math.floor(safeRating); // Full stars count
  const hasHalfStar = safeRating % 1 >= 0.5; // Half star logic
  const emptyStars = maxStars - filledStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

  return (
    <span className="flex items-center text-yellow-400">
      {/* Render full stars */}
      {Array.from({ length: filledStars }).map((_, i) => (
        <AiFillStar key={`full-${i}`} />
      ))}

      {/* Render half star */}
      {hasHalfStar && <AiFillStar key="half" className="half-star" />}

      {/* Render empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <AiOutlineStar key={`empty-${i}`} />
      ))}
    </span>
  );
};

export default RatingStars;
