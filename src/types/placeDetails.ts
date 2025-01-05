// 장소 상세 조회 인터페이스
// 카카오맵에서 부여한 고유ID로 장소 상세 조회

export interface PlaceDetailsParams {
  kakaoPlaceId: string;
}

interface RatingGraph {
  [key: string]: number;
}

interface Review {
  reviewId: number;
  writerName: string;
  writerTotalReviewCount: number;
  starRating: number;
  visitedDate: string;
  content: string;
  writerProfileImageUrl: string;
  reviewImageUrls: string[];
}

export interface PlaceDetails {
  placeName: string;
  reviewCount: number;
  averageStarRating: number;
  ratingGraph: RatingGraph;
  reviews: Review[];
}
