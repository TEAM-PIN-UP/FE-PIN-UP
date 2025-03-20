import getApi from "@/api/getApi";
import { GetPlaceParams, GetPlaceResponse } from "@/interface/place";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

const useGetPlaces = (
  params: GetPlaceParams
): UseQueryResult<GetPlaceResponse[]> => {
  const queryFn = async () => {
    const response = await getApi.getPlace(params);
    return response.data;
  };

  const isValid = [
    params.swLatitude,
    params.swLongitude,
    params.neLatitude,
    params.neLongitude,
  ].every((val) => val !== undefined && val !== null && val !== "");

  return useQuery({
    queryFn,
    enabled: isValid,
    queryKey: queryKeys.places(params),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetPlaces;
