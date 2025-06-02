import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/StarRating";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";

interface ReviewFormProps {
  onSubmit: (formData: {
    email: string;
    review: string;
    rating: number;
  }) => Promise<void>;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    review: "",
    rating: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ email: "", review: "", rating: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 py-4">
      <div className="flex flex-col gap-4">
        <div className="grid gap-2 place-items-center">
          <Label className="text-2xl font-semibold text-center">
            Add Your Rating
          </Label>
          <StarRating
            onRatingChange={(rating) => setFormData({ ...formData, rating })}
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
            className="p-6"
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
            className="min-h-[100px] max-h-[200px] resize-none overflow-y-auto p-6"
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
  );
}
