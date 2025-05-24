// Review
export interface Review {
  reviewId: number;
  kakaoPlaceId: string;
  placeName: string;
  content: string;
  starRating: number;
  createdAt: string;
  visitedDate: string;
  writerName: string;
  writerTotalReviewCount: number;
  writerProfileImageUrl: string;
}

export interface PhotoReview extends Review {
  reviewImageUrls: string[];
}

// Writing reviews
export interface ReviewRequestType {
  content: string;
  starRating: number;
  visitedDate: string;
}
