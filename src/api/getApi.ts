import {
  GetPlaceParams,
  GetSearchPlacesRequest,
  GetSpecificPlaceRequest,
} from "@/interface/apiInterface";
import { ReviewDetail } from "@/interface/review";
import customAxios from "./Interceptor";

const getApi = {
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

  getMyFeed: () => customAxios.get(`/api/members/me/feed`),

  getReviewId: ({ id }: { id: string }) =>
    customAxios.get<ReviewDetail>(`/api/reviews/${id}`),
  getMyPlace: () => customAxios.get(`/api/bookmarks/my`),
};

export default getApi;
