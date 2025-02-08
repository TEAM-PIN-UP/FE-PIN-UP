import {
  GetPlaceParams,
  GetSearchPlacesRequest,
} from "@/interface/apiInterface";
import customAxios from "./Interceptor";

const getApi = {
  //   getReview: () => customAxios.get(`/api/places/reviews`),
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
};

export default getApi;
