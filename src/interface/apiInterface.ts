export interface GetPlaceParams {
  query: string;
  longitude: string;
  latitude: string;
}

export interface GetPlaceResponse {
  kakaoMapId: string;
  name: string;
  category: string;
  phone: string;
  address: string;
  roadAddress: string;
  longitudeX: string;
  latitudeY: string;
  distance: string;
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
  category: string;
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
