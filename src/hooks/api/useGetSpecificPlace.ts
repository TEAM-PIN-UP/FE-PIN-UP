import getApi from "@/api/getApi";
import {
  GetSpecificPlaceRequest,
  GetSpecificPlaceResponse,
} from "@/interface/apiInterface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const useGetSpecificPlaces = ({
  kakaoPlaceId,
  currentLongitude,
  currentLatitude,
}: GetSpecificPlaceRequest): UseQueryResult<GetSpecificPlaceResponse> => {
  const queryFn = async () => {
    const response = await getApi.getSpecificPlace({
      kakaoPlaceId,
      currentLongitude,
      currentLatitude,
    });
    return response.data;
  };

  return useQuery({
    queryFn,
    queryKey: ["places", kakaoPlaceId],
    enabled: Boolean(kakaoPlaceId),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetSpecificPlaces;
