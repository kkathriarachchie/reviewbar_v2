import * as z from "zod";

export const reviewSchema = z.object({
  rating: z
    .number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be a number",
    })
    .min(1, "Rating is required")
    .max(5),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Valid email is required"),

  review: z
    .string({
      required_error: "Review is required",
    })
    .min(1, "Review is required"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
