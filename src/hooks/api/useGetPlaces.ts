import getApi from "@/api/getApi";
import { GetPlaceParams, GetPlaceResponse } from "@/interface/apiInterface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const useGetPlaces = ({
  query,
  category,
  sort,
  swLatitude,
  swLongitude,
  neLatitude,
  neLongitude,
  currentLatitude,
  currentLongitude,
}: GetPlaceParams): UseQueryResult<GetPlaceResponse[]> => {
  const queryFn = async () => {
    const response = await getApi.getPlace({
      query,
      category,
      sort,
      swLatitude,
      swLongitude,
      neLatitude,
      neLongitude,
      currentLatitude,
      currentLongitude,
    });
    return response.data;
  };

  return useQuery({
    queryFn,
    queryKey: ["places", query, category, sort, swLatitude, swLongitude, neLatitude, neLongitude, currentLatitude, currentLongitude],
    enabled: Boolean(category && sort && swLatitude && swLongitude && neLatitude && neLongitude && currentLatitude && currentLongitude),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetPlaces;