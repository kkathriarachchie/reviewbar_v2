"use client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getReviews, addReview } from "@/app/services/api";
import { Review } from "@/app/types/api";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/StarRating";
import { v4 as uuidv4 } from "uuid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RatingDistribution } from "@/components/RatingDistribution";

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

  // ...existing states...
  const [formData, setFormData] = useState({
    email: "",
    review: "",
    rating: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        // Show success message
        toast.success("Review submitted successfully!");
        // Reset form data
        setFormData({
          email: "",
          review: "",
          rating: 0,
        });
        // Refresh reviews after successful submission
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

  // Add this function at the top of your component, after the imports
  const getRandomAvatar = (email: string) => {
    // Using email as seed ensures the same user always gets the same avatar
    const styles = [
      "adventurer",
      "adventurer-neutral",
      "avataaars",
      "avataaars-neutral",
      "big-ears",
      "big-ears-neutral",
      "big-smile",
      "bottts",
      "bottts-neutral",
      "croodles",
      "croodles-neutral",
      "fun-emoji",
      "icons",
      "identicon",
      "initials",
      "micah",
      "miniavs",
      "notionists",
      "notionists-neutral",
      "open-peeps",
      "personas",
      "pixel-art",
      "pixel-art-neutral",
    ];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${email}`;
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
          {" "}
          {/* Adjust the height calculation as needed */}
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
                <Card
                  key={review.review_id}
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
                      <h3 className="font-semibold text-gray-600">
                        {review.email}
                      </h3>
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
                      <span className="text-sm text-gray-500 block mt-2">
                        {review.createdAt
                          ? new Date(review.createdAt).toLocaleDateString()
                          : "Unknown date"}
                      </span>
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </Card>
              ))}{" "}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Fixed Bottom Button */}
      <div className="sticky bottom-0 py-4 bg-background mt-auto">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="w-full mx-auto py-6 text-lg font-medium">
              Add Your Review
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <form onSubmit={handleSubmit} className="grid gap-6 py-4">
                <div className="flex flex-col  gap-4 ">
                  <div className="grid gap-2 place-items-center">
                    <Label className="text-2xl font-semibold text-center">
                      Add Your Rating
                    </Label>
                    <StarRating
                      onRatingChange={(rating) =>
                        setFormData({ ...formData, rating })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-base">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="review" className="text-base">
                      Your Review
                    </Label>
                    <Textarea
                      id="review"
                      required
                      value={formData.review}
                      onChange={(e) =>
                        setFormData({ ...formData, review: e.target.value })
                      }
                      placeholder="Write your review for this product here."
                      className="min-h-[100px] max-h-[200px] resize-none overflow-y-auto"
                    />
                  </div>
                </div>

                <DrawerFooter className="px-0">
                  <Button
                    type="submit"
                    className="w-full mx-auto py-6 text-lg font-medium"
                  >
                    Submit Review
                  </Button>
                  <DrawerClose asChild>
                    <Button
                      variant="outline"
                      className="w-full mx-auto py-6 text-lg font-medium"
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
