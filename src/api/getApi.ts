import { GetMyPlaceProps } from "@/hooks/api/myPlace/useGetMyPlace";
import { GetReviewsParams } from "@/hooks/api/review/useGetReviews";
import {
  GetPlaceParams,
  GetSearchPlacesRequest,
  GetSpecificPlaceRequest,
} from "@/interface/place";
import customAxios from "./Interceptor";

const getApi = {
  // Places
  getSpecificPlace: ({
    kakaoPlaceId,
    currentLatitude,
    currentLongitude,
  }: GetSpecificPlaceRequest) =>
    customAxios.get(`/api/places/${kakaoPlaceId}`, {
      params: { currentLatitude, currentLongitude },
    }),
  getPlace: (params: GetPlaceParams) => {
    const queryParams = new URLSearchParams(
      Object.entries(params)
        .filter(([value]) => value !== undefined && value !== null) // Remove undefined & null
        .map(([key, value]) => [key, String(value)]) // Convert to string
    ).toString();
    return customAxios.get(`/api/places?${queryParams}`);
  },
  getSearchPlaces: ({ keyword }: GetSearchPlacesRequest) =>
    customAxios.get(`/api/places/keyword`, { params: { query: keyword } }),

  // Signup
  getMemberNicknameCheck: ({ nickname }: { nickname: string }) =>
    customAxios.get(`/api/members/nickname/check`, { params: { nickname } }),

  // Member Feed
  getMemberDetails: ({ id }: { id: number }) =>
    customAxios.get(`/api/members/${id}`),
  getTextReviews: (params: GetReviewsParams) =>
    customAxios.get(`/api/members/${params.id}/text-reviews`, {
      params: { page: params.page, size: params.size },
    }),
  getPhotoReviews: (params: GetReviewsParams) =>
    customAxios.get(`/api/members/${params.id}/photo-reviews`, {
      params: { page: params.page, size: params.size },
    }),
  getReviewId: ({ id }: { id: string }) =>
    customAxios.get(`/api/reviews/${id}`),
  getBookmarks: (params: GetMyPlaceProps) =>
    customAxios.get(`/api/bookmarks`, { params }),
  getSearchMember: ({ nickname }: { nickname: string }) =>
    customAxios.get(`/api/members/search`, { params: { nickname } }),
  getFriendShips: () => customAxios.get(`/api/friendships`),
  getReceivedFriendRequests: () =>
    customAxios.get(`/api/friend-requests/received`),
};

export default getApi;
