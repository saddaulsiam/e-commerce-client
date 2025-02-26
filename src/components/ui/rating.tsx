import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// Function to render stars based on rating
const RatingStars = ({ rating }: { rating: number }) => {
  const maxStars = 5;
  const filledStars = Math.floor(rating); // Full stars count
  const hasHalfStar = rating % 1 !== 0; // Check if there's a half star
  const emptyStars = maxStars - filledStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

  return (
    <span className="flex items-center text-yellow-400">
      {/* Render full stars */}
      {Array(filledStars)
        .fill(null)
        .map((_, i) => (
          <AiFillStar key={`full-${i}`} />
        ))}

      {/* Render half star if applicable */}
      {hasHalfStar && (
        <AiOutlineStar key="half" className="relative">
          <AiFillStar className="absolute left-0 top-0 w-1/2 overflow-hidden" />
        </AiOutlineStar>
      )}

      {/* Render empty stars */}
      {Array(emptyStars)
        .fill(null)
        .map((_, i) => (
          <AiOutlineStar key={`empty-${i}`} />
        ))}
    </span>
  );
};

export default RatingStars;
