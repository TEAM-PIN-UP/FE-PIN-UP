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
  latitude: string,
  longitude: string,
  reviewCount: number
}

export interface postCreateReviewRequest {
  reviewRequest: {
    content: string,
    starRating: number,
    visitedDate: string,
  },
  placeRequest: {
    kakaoPlaceId: string,
    name: string,
    category: string,
    address: string,
    roadAddress: string,
    latitude: string,
    longitude: string
  },
  multipartFiles: string[]

}

export interface postCreateReviewResponse {
  kakaoPlaceId: number,
  name: string,
  category: string,
  address: string,
  roadAddress: string,
  latitude: string,
  longitude: string
}