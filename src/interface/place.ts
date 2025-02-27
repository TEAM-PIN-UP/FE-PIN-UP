import { placeCategory, placeSort } from "./apiInterface";

export interface PlaceParams {
  category?: placeCategory;
  sort?: placeSort;
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
