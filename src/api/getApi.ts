import {
  GetPlaceParams,
  GetSearchPlacesRequest,
  GetSpecificPlaceRequest,
} from "@/interface/apiInterface";
import { ReviewDetail } from "@/interface/review";
import customAxios from "./Interceptor";

const getApi = {
  //   getReview: () => customAxios.get(`/api/places/reviews`),

  getSpecificPlace: ({
    kakaoPlaceId,
    currentLatitude,
    currentLongitude,
  }: GetSpecificPlaceRequest) =>
    customAxios.get(
      `/api/places/${kakaoPlaceId}?currentLatitude=${currentLatitude}&currentLongitude=${currentLongitude}`
    ),
  getPlace: (params: GetPlaceParams) => {
    const queryParams = new URLSearchParams(
      Object.entries(params)
        .filter(([value]) => value !== undefined && value !== null) // Remove undefined & null
        .map(([key, value]) => [key, String(value)]) // Convert to string
    ).toString();
    return customAxios.get(`/api/places?${queryParams}`);
  },

  getSearchPlaces: ({ keyword }: GetSearchPlacesRequest) =>
    customAxios.get(`/api/places/keyword?query=${keyword}`),

  getMemberNicknameCheck: ({ nickname }: { nickname: string }) =>
    customAxios.get(`/api/members/nickname/check?${nickname}`),

  getMyProfile: () => customAxios.get(`/api/members/me/profile`),
  getMyPhotos: () => customAxios.get(`/api/reviews/my/photo`),
  getMyTexts: () => customAxios.get(`/api/reviews/my/text`),

  getReviewId: ({ id }: { id: string }) =>
    customAxios.get<ReviewDetail>(`/api/reviews/${id}`),
};

export default getApi;
