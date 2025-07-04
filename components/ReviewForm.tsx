"use client";

import { useState, useRef } from "react";
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
import ReCAPTCHA from "react-google-recaptcha";

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
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const isSubmitDisabled = !recaptchaToken;
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const handleChange = (
    field: keyof ReviewFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleRecaptcha = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaToken) {
      return;
    }

    try {
      const validatedData = reviewSchema.parse(formData);
      console.log("reCAPTCHA Token:", recaptchaToken);
      await onSubmit(validatedData);
      setFormData({ rating: 0, email: "", review: "" });
      setErrors({});
      setRecaptchaToken(null);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset(); // Reset reCAPTCHA
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
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
        <div className="flex justify-center w-full">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            onChange={handleRecaptcha}
          />
        </div>
        <Button
          type="submit"
          className="w-full mx-auto py-6 text-lg font-medium bg-[oklch(75.56%_0.182_142.9)]"
          disabled={isSubmitDisabled}
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
