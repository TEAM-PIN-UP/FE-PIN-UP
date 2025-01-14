// 키워드 없이 장소 목록 조회 인터페이스
// 리뷰가 있는 장소 목록만 조회 / 카테고리(음식점, 카페), 정렬조건(가까운 순, 최신 순, 별점 높은 순, 별점 낮은 순)
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
