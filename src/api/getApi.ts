import { getMyPlaceProps } from "@/hooks/api/myPlace/useGetMyPlace";
import {
  GetPlaceParams,
  GetSearchPlacesRequest,
  GetSpecificPlaceRequest,
} from "@/interface/apiInterface";
import customAxios from "./Interceptor";

const getApi = {
  // Places
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

  // Signup
  getMemberNicknameCheck: ({ nickname }: { nickname: string }) =>
    customAxios.get(`/api/members/nickname/check?nickname=${nickname}`),

  // Member Feed
  getMemberDetails: ({ id }: { id: number }) =>
    customAxios.get(`/api/members/${id}`),
  getTextReviews: ({
    id,
    page,
    size,
  }: {
    id: number | string;
    page: number | string;
    size: number | string;
  }) =>
    customAxios.get(`/api/members/${id}/text-reviews`, {
      params: { page, size },
    }),
  getPhotoReviews: ({
    id,
    page,
    size,
  }: {
    id: number | string;
    page: number | string;
    size: number | string;
  }) =>
    customAxios.get(`/api/members/${id}/photo-reviews`, {
      params: { page, size },
    }),
  getReviewId: ({ id }: { id: string }) =>
    customAxios.get(`/api/reviews/${id}`),
  getMyPlace: ({ category, sort }: getMyPlaceProps) =>
    customAxios.get(`/api/bookmarks/my?category=${category}&sort=${sort}`),
  getSearchMember: ({ nickname }: { nickname: string }) =>
    customAxios.get(`/api/members/search?nickname=${nickname}`),
  getFriendShips: () => customAxios.get(`/api/friendships`),
  getReceivedFriendRequests: () =>
    customAxios.get(`/api/friend-requests/received`),
};

export default getApi;
