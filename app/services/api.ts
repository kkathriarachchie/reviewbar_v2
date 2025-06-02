import { Review, ApiResponse } from "../types/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const addReview = async (
  upc: string,
  reviewData: Review
): Promise<ApiResponse<Review>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/add-review/${upc}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error adding review:", error);
    return { error: "Failed to add review" };
  }
};

export const getReviews = async (
  upc: string
): Promise<ApiResponse<Review[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${upc}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { error: "Failed to fetch reviews" };
  }
};
