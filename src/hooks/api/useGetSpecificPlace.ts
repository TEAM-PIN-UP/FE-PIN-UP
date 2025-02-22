import getApi from "@/api/getApi";
import {
  GetSpecificPlaceRequest,
  GetSpecificPlaceResponse,
} from "@/interface/apiInterface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface setProp {
  setBookmark: React.Dispatch<React.SetStateAction<boolean>>;
}

const useGetSpecificPlaces = ({
  kakaoPlaceId,
  currentLongitude,
  currentLatitude,
  setBookmark,
}: GetSpecificPlaceRequest &
  setProp): UseQueryResult<GetSpecificPlaceResponse> => {
  const queryFn = async () => {
    const response = await getApi.getSpecificPlace({
      kakaoPlaceId,
      currentLongitude,
      currentLatitude,
    });
    setBookmark(response.data.bookmark);
    return response.data;
  };

  return useQuery({
    queryFn,
    queryKey: ["places", kakaoPlaceId, currentLatitude, currentLongitude],
    enabled: Boolean(kakaoPlaceId),
    retry: 1,
    // staleTime: 1000 * 60 * 5,
  });
};

export default useGetSpecificPlaces;
