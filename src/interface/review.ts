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
  content: string;
  createdAt: string;
  kakaoPlaceId: string;
  placeName: string;
  reviewId: number;
  reviewImageUrls: string[];
  starRating: number;
  visitedDate: string;
  writerName: string;
  writerTotalReviewCount: number;
  writerProfileImageUrl: string;
}

export interface ReviewDetail {
  id: number;
  content: string;
  starRating: number;
  type: string;
  imageUrls: string[];
  createdAt: DateTimeTuple;
}
