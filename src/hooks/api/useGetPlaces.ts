import getApi from "@/api/getApi";
import { GetPlaceParams, GetPlaceResponse } from "@/interface/apiInterface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const useGetPlaces = ({
  query,
  latitude,
  longitude,
}: GetPlaceParams): UseQueryResult<GetPlaceResponse> => {
  const fetcher = async () => {
    const response = await getApi.getPlace({ query, latitude, longitude });
    return response.data;
  };
  return useQuery({
    queryKey: ["places", query, latitude, longitude],
    queryFn: fetcher,
  });
};

export default useGetPlaces;
