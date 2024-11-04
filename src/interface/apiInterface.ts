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
