import getApi from "@/api/getApi";
import {
  GetMyPlaceResponse,
  PlaceCategory,
  PlaceSort,
} from "@/interfaces/place";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export interface GetMyPlaceProps {
  sort: PlaceSort;
  category: PlaceCategory;
  currentLatitude: number | string;
  currentLongitude: number | string;
}

const useGetBookmarks = (
  params: GetMyPlaceProps
): UseQueryResult<GetMyPlaceResponse[]> => {
  const queryFn = async () => {
    const response = await getApi.getBookmarks(params);
    return response.data;
  };
  return useQuery({
    queryFn,
    queryKey: ["myplace"],
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetBookmarks;
