import { Review } from "./review";
export type placeCategory = "ALL" | "RESTAURANT" | "CAFE";
export type placeSort = "NEAR" | "LATEST" | "STAR_HIGH" | "STAR_LOW";
export type relationType = "SELF" | "FRIEND" | "PENDING" | "STRANGER";

// Get places
export interface GetPlaceParams {
  query?: string;
  category?: placeCategory;
  sort?: placeSort;
  swLatitude: string | number;
  swLongitude: string | number;
  neLatitude: string | number;
  neLongitude: string | number;
  currentLatitude?: string | number;
  currentLongitude?: string | number;
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

// Search places
export interface GetSearchPlacesRequest {
  keyword: string;
}
export interface GetSearchPlacesResponse {
  kakaoPlaceId: string;
  name: string;
  placeCategory: string;
  address: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  reviewCount: number;
  averageStarRating: number;
}

// My places
export interface GetMyPlaceResponse {
  id: number;
  placeId: number;
  placeName: string;
  placeAddress: string;
  placeRoadAddress: string;
  placeFirstReviewImageUrl: string;
  placeLatitude: number;
  placeLongitude: number;
  placeStatus: string;
  placeCategory: placeCategory;
  kakaoPlaceId: string;
}

// Specific places
export interface GetSpecificPlaceRequest {
  kakaoPlaceId: string;
  currentLatitude: number | undefined;
  currentLongitude: number | undefined;
}
export interface GetSpecificPlaceResponse {
  mapPlaceResponse: {
    name: string;
    reviewCount: number;
    averageStarRating: number;
    distance: string;
    latitude: number;
    longitude: number;
    placeCategory: placeCategory;
    reviewImageUrls: string[];
    reviewerProfileImageUrls: string[];
    bookmark: boolean;
  };
  ratingGraph: Map<string, number>;
  reviews: Review[];
}

export interface PlaceRequestType {
  kakaoPlaceId: string;
  name: string;
  category: string;
  address: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
}
