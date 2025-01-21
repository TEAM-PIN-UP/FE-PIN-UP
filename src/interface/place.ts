export interface PlaceParams {
  category?: "음식점" | "카페";
  sort?: "가까운 순" | "최신 순" | "별점 높은 순" | "별점 낮은 순";
  swLatitude: string;
  swLongitude: string;
  neLatitude: string;
  neLongitude: string;
  currentLatitude: string;
  currentLongitude: string;
}

export type PlaceCategory = "ALL" | "CAFE" | "RESTAURANT";

export interface PlaceResponse {
  placeId: number;
  kakaoPlaceId: string;
  name: string;
  averageStarRating: number;
  reviewCount: number;
  distance: string;
  latitude: number;
  longitude: number;
  placeCategory: PlaceCategory;
  reviewImageUrls: string[];
  reviewerProfileImageUrls: string[];
}

// Place details

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

export interface PlaceDetailsResponse {
  placeName: string;
  reviewCount: number;
  averageStarRating: number;
  ratingGraph: RatingGraph;
  reviews: Review[];
}

// Place keyword

export interface PlaceKeywordParams {
  query: string;
}

export interface PlaceKeywordResponse {
  kakaoMapId: string;
  name: string;
  category: string;
  address: string;
  roadAddress: string;
  latitude: string;
  longitude: string;
  reviewCount: number;
  averageStarRating: number;
}
