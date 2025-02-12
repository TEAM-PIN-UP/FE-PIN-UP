import getApi from "@/api/getApi";
import {
  GetSearchPlacesRequest,
  GetSearchPlacesResponse,
} from "@/interface/apiInterface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const useGetSearchPlaces = ({
  keyword,
}: GetSearchPlacesRequest): UseQueryResult<GetSearchPlacesResponse[]> => {
  const queryFn = async () => {
    const response = await getApi.getSearchPlaces({ keyword });
    return response.data;
  };
  return useQuery({
    queryFn,
    queryKey: ["searchPlaces", keyword],
    enabled: Boolean(keyword),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetSearchPlaces;
