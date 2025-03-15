import getApi from "@/api/getApi";
import { GetPlaceParams, GetPlaceResponse } from "@/interface/place";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const useGetPlaces = (
  params: GetPlaceParams
): UseQueryResult<GetPlaceResponse[]> => {
  const queryFn = async () => {
    const response = await getApi.getPlace(params);
    return response.data;
  };

  const isValid = Object.values(params).every(
    (val) => val !== undefined && val !== null
  );

  return useQuery({
    queryFn,
    queryKey: ["places", params],
    enabled: isValid,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetPlaces;
