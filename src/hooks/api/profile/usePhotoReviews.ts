import getApi from "@/api/getApi";
import { PhotoReview } from "@/interface/review";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const usePhotoReviews = ({
  id,
  page,
  size,
}: {
  id: number | undefined;
  page: number | string;
  size: number | string;
}): UseQueryResult<PhotoReview[]> => {
  const queryFn = async () => {
    try {
      if (id === undefined) throw Error;
      const response = await getApi.getPhotoReviews({ id, page, size });
      return response.data.content;
    } catch (error) {
      console.error("Cannot fetch photo reviews:", error);
    }
  };
  return useQuery({ queryFn, queryKey: [`photoReviews-${id}`] });
};

export default usePhotoReviews;
