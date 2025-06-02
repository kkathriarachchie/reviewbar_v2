import React from "react";
import { Card } from "./ui/card";

interface RatingDistributionProps {
  reviews: {
    rating: string;
  }[];
}

export function RatingDistribution({ reviews }: RatingDistributionProps) {
  // Calculate rating distribution
  const distribution = Array(5).fill(0);
  let totalRatings = 0;

  reviews.forEach((review) => {
    const rating = parseInt(review.rating);
    if (rating >= 1 && rating <= 5) {
      distribution[rating - 1]++;
      totalRatings++;
    }
  });

  // Calculate average rating
  const averageRating =
    reviews.reduce((acc, review) => acc + parseInt(review.rating), 0) /
      reviews.length || 0;

  return (
    <Card>
      <div className="flex gap-8 p-4">
        {/* Left side - Average rating */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < Math.round(averageRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500">{totalRatings} reviews</span>
        </div>

        {/* Right side - Distribution bars */}
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = distribution[rating - 1];
            const percentage = (count / totalRatings) * 100 || 0;

            return (
              <div key={rating} className="flex items-center gap-2 mb-1">
                <span className="w-3">{rating}</span>
                <div className="flex-1 h-4 bg-gray-100 rounded">
                  <div
                    className="h-full bg-yellow-400 rounded"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-sm text-gray-500">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
