"use client";

import { Star } from "lucide-react";
import { useState, useEffect } from "react";

interface StarRatingProps {
  maxStars?: number;
  initialRating?: number;
  onRatingChange: (rating: number) => void;
}

export function StarRating({
  maxStars = 5,
  initialRating = 0,
  onRatingChange,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);

  // Add useEffect to watch for initialRating changes
  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
    onRatingChange(selectedRating);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-4">
        {[...Array(maxStars)].map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleRatingClick(index + 1)}
            className="hover:scale-110 transition-transform"
          >
            <Star
              className={`h-8 w-8 ${
                index < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
      {rating > 0 && (
        <span className="text-sm text-gray-600 font-baloo">
          Selected Rating: {rating} {rating === 1 ? "Star" : "Stars"}
        </span>
      )}
    </div>
  );
}
