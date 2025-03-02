import { MemberDetails } from "./member";

export type placeCategory = "ALL" | "RESTAURANT" | "CAFE";
export type placeSort = "NEAR" | "LATEST" | "STAR_HIGH" | "STAR_LOW";
export type relationType = "SELF" | "FRIEND" | "PENDING" | "STRANGER";

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

export interface GetPinBuddySingle {
  memberId: number;
  email: string;
  name: string;
  nickname: string;
  profilePictureUrl: string;
  bio: string;
  termsOfMarketing: string;
}

export interface GetPinBuddySearchResponse {
  memberResponse: MemberDetails;
  relationType: relationType;
  reviewCount: number;
  pinBuddyCount: number;
}

export interface GetSpecificPlaceRequest {
  kakaoPlaceId: string;
  currentLatitude: number | undefined;
  currentLongitude: number | undefined;
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
  reviews: ReviewSingleType[];
}

export interface ReviewSingleType {
  reviewId: number;
  writerName: string;
  writerTotalReviewCount: number;
  starRating: number;
  visitedDate: string;
  content: string;
  writerProfileImageUrl: string;
  reviewImageUrls: string[];
}

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

export interface ReviewRequestType {
  content: string;
  starRating: number;
  visitedDate: string;
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

export interface PostCreateReviewResponse {
  kakaoPlaceId: number;
  name: string;
  category: string;
  address: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
}
