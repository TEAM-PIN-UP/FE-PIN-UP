import { GetReviewsParams } from "@/hooks/api/review/useGetReviews";
import { MemberProfileResponse } from "@/interfaces/member";
import {
  GetPlaceParams,
  GetPlaceResponse,
  GetSearchPlacesRequest,
  GetSearchPlacesResponse,
  GetSpecificPlaceRequest,
  GetSpecificPlaceResponse,
} from "@/interfaces/place";
import { Review } from "@/interfaces/review";
import { apiGet } from "./apiRequests";

const api = {
  places: {
    getSpecific: (params: GetSpecificPlaceRequest) =>
      apiGet<GetSpecificPlaceResponse>(`/api/places/${params.kakaoPlaceId}`, {
        currentLatitude: params.currentLatitude,
        currentLongitude: params.currentLongitude,
      }),
    getPlace: (params: GetPlaceParams) => {
      const queryString = new URLSearchParams(
        Object.entries(params)
          .filter(
            ([, value]) => value !== undefined && value !== null && value !== "" // Remove empty values
          )
          .map(([key, value]) => [key, String(value)]) // Convert to string
      ).toString();

      return apiGet<GetPlaceResponse>(
        `/api/places${queryString ? `?${queryString}` : ""}`
      );
    },
    getSearch: ({ keyword }: GetSearchPlacesRequest) =>
      apiGet<GetSearchPlacesResponse>(`/api/places/keyword`, { keyword }),
  },

  signup: {
    getMemberNicknameCheck: (nickname: string) =>
      apiGet<boolean>(`/api/members/nickname/check`, { nickname }),
  },

  memberFeed: {
    getMyDetails: () => apiGet<MemberProfileResponse>(`/api/members`),
    getMemberDetails: (id: string | number) =>
      apiGet<MemberProfileResponse>(`/api/members/${id}`),
    getTextReviews: ({ id, page, size }: GetReviewsParams) =>
      apiGet<Review[]>(`/api/members/${id}/text-reviews`, { page, size }),
    getPhotoReviews: ({ id, page, size }: GetReviewsParams) =>
      apiGet<Review[]>(`/api/members/${id}/photo-reviews`, { page, size }),
  },
};

export default api;
