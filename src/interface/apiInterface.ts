export type placeCategory = "ALL" | "RESTAURANT" | "CAFE";
export type placeSort = "NEAR" | "LATEST" | "STAR_HIGH" | "STAR_LOW";

export interface GetPlaceParams {
  query?: string;
  category: placeCategory;
  sort: placeSort;
  swLatitude: string;
  swLongitude: string;
  neLatitude: string;
  neLongitude: string;
  currentLatitude: string;
  currentLongitude: string;
}

export interface GetPlaceResponse {
  placeId: number;
  kakaoPlaceId: string;
  name: string;
  averageStarRating: number;
  reviewCount: number;
  distance: string;
  latitude: number;
  longitude: number;
  placeCategory: placeCategory;
  reviewImageUrls: string[];
  reviewerProfileImageUrls: string[];
}

export interface GetSearchPlacesRequest {
  keyword: string;
}

export interface GetSearchPlacesResponse {
  kakaoMapId: string;
  name: string;
  category: string;
  address: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  reviewCount: number;
  averageStarRating: number;
}

export interface ReviewRequestType {
  content: string;
  starRating: number;
  visitedDate: string;
}

export interface PlaceRequestType {
  kakaoPlaceId: string;
  name: string;
  category: placeCategory;
  address: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
}

export interface PostCreateReviewResponse {
  kakaoPlaceId: number;
  name: string;
  category: string;
  address: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
}
