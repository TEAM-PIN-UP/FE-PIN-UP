// 키워드로 장소 목록 조회 인터페이스
// 리뷰 작성 시 장소 목록 조회할 때 사용 / 카카오맵 API 호출함

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
