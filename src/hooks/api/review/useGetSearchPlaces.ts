import getApi from "@/api/getApi";
import {
  GetSearchPlacesRequest,
  GetSearchPlacesResponse,
} from "@/interface/place";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

const useGetSearchPlaces = ({
  keyword,
}: GetSearchPlacesRequest): UseQueryResult<GetSearchPlacesResponse[]> => {
  const queryFn = async () => {
    const response = await getApi.getSearchPlaces({ keyword });
    return response.data;
  };
  return useQuery({
    queryFn,
    enabled: !!keyword,
    queryKey: queryKeys.searchPlaces(keyword),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetSearchPlaces;
