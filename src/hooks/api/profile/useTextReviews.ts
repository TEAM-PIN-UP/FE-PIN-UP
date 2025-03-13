import getApi from "@/api/getApi";
import { Review } from "@/interface/review";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const useTextReviews = ({
  id,
  page,
  size,
}: {
  id: number | undefined;
  page: number | string;
  size: number | string;
}): UseQueryResult<Review[]> => {
  const queryFn = async () => {
    try {
      if (id === undefined) throw Error;
      const response = await getApi.getTextReviews({ id, page, size });
      return response.data.content;
    } catch (error) {
      console.error("Cannot fetch text reviews:", error);
    }
  };
  return useQuery({ queryFn, queryKey: [`textReviews-${id}`] });
};

export default useTextReviews;
