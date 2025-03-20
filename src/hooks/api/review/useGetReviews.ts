import getApi from "@/api/getApi";
import { PhotoReview, Review } from "@/interface/review";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

export interface GetReviewsParams {
  id: string | number | undefined;
  page: string | number;
  size: string | number;
}

export const useGetTextReviews = (
  params: GetReviewsParams
): UseQueryResult<Review[]> => {
  const queryFn = async () => {
    try {
      if (params.id === undefined) throw Error;
      const response = await getApi.getTextReviews(params);
      return response.data.content;
    } catch (error) {
      console.error("Cannot get text reviews:", error);
    }
  };
  return useQuery({
    queryFn,
    enabled: !!params.id,
    queryKey: queryKeys.textReviews(params.id!),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetPhotoReviews = (
  params: GetReviewsParams
): UseQueryResult<PhotoReview[]> => {
  const queryFn = async () => {
    try {
      if (params.id === undefined) throw Error;
      const response = await getApi.getPhotoReviews(params);
      return response.data.content;
    } catch (error) {
      console.error("Cannot get photo reviews:", error);
    }
  };
  return useQuery({
    queryFn,
    enabled: !!params.id,
    queryKey: queryKeys.photoReviews(params.id!),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};
