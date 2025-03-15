import getApi from "@/api/getApi";
import {
  GetSpecificPlaceRequest,
  GetSpecificPlaceResponse,
} from "@/interface/place";
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
      currentLongitude:
        currentLongitude === undefined ? 127.0 : currentLongitude,
      currentLatitude: currentLatitude === undefined ? 37.5 : currentLatitude,
    });
    setBookmark(response.data.bookmark);
    return response.data;
  };

  return useQuery({
    queryFn,
    queryKey: [
      "places",
      kakaoPlaceId,
      currentLatitude === undefined ? 37.5 : currentLatitude,
      currentLongitude === undefined ? 127.0 : currentLongitude,
    ],
    enabled: Boolean(kakaoPlaceId),
    retry: 1,
    // staleTime: 1000 * 60 * 5,
  });
};

export default useGetSpecificPlaces;
