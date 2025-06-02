"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getReviews, addReview } from "@/app/services/api";
import { Review } from "@/app/types/api";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ArrowLeft } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { RatingDistribution } from "@/components/RatingDistribution";
import { ReviewCard } from "@/components/ReviewCard";
import { ReviewForm } from "@/components/ReviewForm";
import { getRandomAvatar } from "@/lib/avatar-utils";

export default function ReviewPage() {
  const { upc } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviews(upc as string);
        if (response.error) {
          setError(response.error);
        } else if (response.data) {
          setReviews(response.data);
        }
      } catch (err) {
        setError(`Failed to load reviews for UPC ${upc}: ${err}`);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [upc]);

  const handleSubmitReview = async (formData: {
    email: string;
    review: string;
    rating: number;
  }) => {
    try {
      const response = await addReview(upc as string, {
        review_id: uuidv4(),
        email: formData.email,
        comment: formData.review,
        rating: formData.rating.toString(),
      });

      if (response.error) {
        toast.error(response.error);
        setError(response.error);
      } else {
        toast.success("Review submitted successfully!");
        const updatedReviews = await getReviews(upc as string);
        if (updatedReviews.data) {
          setReviews(updatedReviews.data);
        }
      }
    } catch (err) {
      const errorMessage = `Failed to submit review: ${err}`;
      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="pt-6 px-6 min-h-screen flex flex-col">
      <Toaster position="top-center" richColors />
      <div className=" font-semibold text-xl flex flex-row items-center gap-2 mb-4">
        <Button
          variant="secondary"
          size="icon"
          className="size-8"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="size-6" />
        </Button>
        Product UPC : {upc}
      </div>
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-[calc(100vh-180px)]">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {reviews.length === 0 ? (
            <Card className="p-4">
              <p>
                There are no reviews for this product yet. Feel free to add
                yours and contribute to the community.
              </p>
            </Card>
          ) : (
            <div className="space-y-4 pr-4">
              <div className="mb-6">
                <RatingDistribution reviews={reviews} />
              </div>
              {reviews.map((review) => (
                <ReviewCard
                  key={review.review_id}
                  review={review}
                  getRandomAvatar={getRandomAvatar}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      <div className="sticky bottom-0 py-4 bg-background mt-auto">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="w-full mx-auto py-6 text-lg font-medium">
              Write a review
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <ReviewForm onSubmit={handleSubmitReview} />
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
