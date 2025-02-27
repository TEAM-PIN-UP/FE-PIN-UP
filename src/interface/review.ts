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
  writerName: string;
  writerTotalReviewCount: number;
  starRating: number;
  visitedDate: string;
  content: string;
  writerProfileImageUrl: string;
  reviewImageUrls: string[];
  createdAt: string;
  kakaoPlaceId: string;
  placeName: string;
}

export interface ReviewDetail {
  id: number;
  content: string;
  starRating: number;
  type: string;
  imageUrls: string[];
  createdAt: DateTimeTuple;
}
