export type DateTimeTuple = [
  /* year */ number,
  /* month */ number,
  /* day */ number,
  /* hour */ number,
  /* minute */ number,
  /* second */ number,
  /* timestamp */ number
];

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

export interface ReviewDetail {
  id: number;
  content: string;
  starRating: number;
  type: string;
  imageUrls: string[];
  createdAt: DateTimeTuple;
}
