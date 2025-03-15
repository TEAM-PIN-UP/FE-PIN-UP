import getApi from "@/api/getApi";
import { PhotoReview, Review } from "@/interface/review";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

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
      return response.data;
    } catch (error) {
      console.error("Cannot get text reviews:", error);
    }
  };
  return useQuery({
    queryFn,
    queryKey: ["textReviews", params.id],
    enabled: Boolean(params.id),
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
      return response.data;
    } catch (error) {
      console.error("Cannot get photo reviews:", error);
    }
  };
  return useQuery({
    queryFn,
    queryKey: ["photoReviews", params.id],
    enabled: Boolean(params.id),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};
