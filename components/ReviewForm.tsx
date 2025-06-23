"use client";

import { useState } from "react";
import { z } from "zod";
import {
  reviewSchema,
  type ReviewFormData,
} from "@/lib/validations/review-schema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/StarRating";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";

interface ReviewFormProps {
  onSubmit: (formData: ReviewFormData) => Promise<void>;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [formData, setFormData] = useState<Partial<ReviewFormData>>({
    rating: 0,
    email: "",
    review: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ReviewFormData, string>>
  >({});

  const handleChange = (
    field: keyof ReviewFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate the form data
      const validatedData = reviewSchema.parse(formData);

      // Submit the form if validation passes
      await onSubmit(validatedData);

      // Reset form on success
      setFormData({ rating: 0, email: "", review: "" });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Transform Zod errors into a more usable format
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 py-4">
      <div className="flex flex-col gap-4">
        <div className="grid gap-2 place-items-center">
          <Label className="text-2xl font-semibold text-center text-[oklch(75.56%_0.182_142.9)]">
            Add Your Rating
          </Label>
          <StarRating
            initialRating={formData.rating}
            onRatingChange={(value) => handleChange("rating", value)}
          />
          {errors.rating && (
            <span className="text-sm text-red-500">{errors.rating}</span>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Enter your email"
            className="p-6 border-[oklch(75.56%_0.182_142.9)] border-3 "
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="review">Your Review</Label>
          <Textarea
            id="review"
            value={formData.review}
            onChange={(e) => handleChange("review", e.target.value)}
            placeholder="Write your review for this product here."
            className="min-h-[100px] max-h-[200px] resize-none overflow-y-auto p-6  border-[oklch(75.56%_0.182_142.9)] border-3 "
          />
          {errors.review && (
            <span className="text-sm text-red-500">{errors.review}</span>
          )}
        </div>
      </div>

      <DrawerFooter className="px-0">
        <Button
          type="submit"
          className="w-full mx-auto py-6 text-lg font-medium bg-[oklch(75.56%_0.182_142.9)]"
        >
          Submit Review
        </Button>
        <DrawerClose asChild>
          <Button
            variant="outline"
            className="w-full mx-auto py-6 text-lg font-medium"
            type="button"
          >
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </form>
  );
}
