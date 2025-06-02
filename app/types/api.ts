export interface Review {
  review_id: string;
  rating: string;
  email: string;
  comment: string;
  createdAt?: Date;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
