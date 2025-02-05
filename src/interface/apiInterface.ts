export type category = 'ALL' | 'RESTAURANT' | 'CAFE';
export type sort = 'NEAR' | 'LATEST' | 'STAR_HIGH' | 'STAR_LOW';

export interface GetPlaceParams {
  query?: string
  category: category,
  sort: sort,
  swLatitude: string,
  swLongitude: string,
  neLatitude: string,
  neLongitude: string,
  currentLatitude: string,
  currentLongitude: string,
}

export interface GetPlaceResponse {
  placeId: number;
  kakaoPlaceId: string;
  name: string;
  averageStarRating: number;
  reviewCount: number;
  distance: string;
  latitude: number,
  longitude: number,
  placeCategory: category,
  reviewImageUrls: string[];
  reviewerProfileImageUrls: string[];
}

export interface getSearchPlacesRequest {
  keyword: string;
}

export interface getSearchPlacesResponse {
  kakaoMapId: string,
  name: string,
  category: string,
  address: string,
  roadAddress: string,
  latitude: number,
  longitude: number,
  reviewCount: number,
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
  category: category;
  address: string;
  roadAddress: string;
  latitude: number,
  longitude: number
}


export interface postCreateReviewResponse {
  kakaoPlaceId: number,
  name: string,
  category: string,
  address: string,
  roadAddress: string,
  latitude: number,
  longitude: number
}
