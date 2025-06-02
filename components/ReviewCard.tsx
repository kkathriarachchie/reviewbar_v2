import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Review } from "@/app/types/api";

interface ReviewCardProps {
  review: Review;
  getRandomAvatar: (email: string) => string;
}

export function ReviewCard({ review, getRandomAvatar }: ReviewCardProps) {
  return (
    <Card
      className={cn(
        "p-4 bg-card text-card-foreground flex flex-col gap-3 rounded-xl border py-6 shadow-sm"
      )}
    >
      <div className="flex flex-col items-start gap-1">
        <div className="flex flex-row items-center gap-3">
          <Avatar>
            <AvatarImage
              src={getRandomAvatar(review.email)}
              alt={review.email}
            />
            <AvatarFallback>
              {review.email.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold ">{review.email}</h3>
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 ${
                  index < Number(review.rating)
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
          <span className="text-sm block mt-2">
            {review.createdAt
              ? new Date(review.createdAt).toLocaleDateString()
              : "Unknown date"}
          </span>
        </div>
      </div>
      <p>{review.comment}</p>
    </Card>
  );
}
