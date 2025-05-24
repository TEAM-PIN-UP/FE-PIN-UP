import { GetMyPlaceProps } from "@/hooks/api/myPlace/useGetMyPlace";
import { GetReviewsParams } from "@/hooks/api/review/useGetReviews";
import {
  GetPlaceParams,
  GetSearchPlacesRequest,
  GetSpecificPlaceRequest,
} from "@/interfaces/place";
import apiAxios from "./interceptors";

const getApi = {
  // Places
  getSpecificPlace: ({
    kakaoPlaceId,
    currentLatitude,
    currentLongitude,
  }: GetSpecificPlaceRequest) =>
    apiAxios.get(`/api/places/${kakaoPlaceId}`, {
      params: { currentLatitude, currentLongitude },
    }),
  getPlace: (params: GetPlaceParams) => {
    const queryParams = new URLSearchParams(
      Object.entries(params)
        .filter(
          ([, value]) => value !== undefined && value !== null && value !== "" // Remove empty values
        )
        .map(([key, value]) => [key, String(value)]) // Convert to string
    ).toString();

    return apiAxios.get(`/api/places?${queryParams}`);
  },
  getSearchPlaces: ({ keyword }: GetSearchPlacesRequest) =>
    apiAxios.get(`/api/places/keyword`, { params: { query: keyword } }),

  // Signup
  getMemberNicknameCheck: (nickname: string) =>
    apiAxios.get(`/api/members/nickname/check`, { params: { nickname } }),

  // Member Feed
  getMyDetails: () => apiAxios.get(`/api/members`),
  getMemberDetails: (id: string | number) => apiAxios.get(`/api/members/${id}`),
  getTextReviews: (params: GetReviewsParams) =>
    apiAxios.get(`/api/members/${params.id}/text-reviews`, {
      params: { page: params.page, size: params.size },
    }),
  getPhotoReviews: (params: GetReviewsParams) =>
    apiAxios.get(`/api/members/${params.id}/photo-reviews`, {
      params: { page: params.page, size: params.size },
    }),
  getReviewId: (id: string | number) => apiAxios.get(`/api/reviews/${id}`),
  getBookmarks: (params: GetMyPlaceProps) =>
    apiAxios.get(`/api/bookmarks`, { params }),
  getSearchMember: (nickname: string) =>
    apiAxios.get(`/api/members/search`, { params: { nickname } }),
  getFriends: (id: string | number) => apiAxios.get(`/api/friendships/${id}`),
  getReceivedFriendRequests: () =>
    apiAxios.get(`/api/friend-requests/received`),
  getSentFriendRequests: () => apiAxios.get(`/api/friend-requests/sent`),
};

export default getApi;
