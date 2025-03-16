import getApi from "@/api/getApi";
import {
  GetMyPlaceResponse,
  placeCategory,
  placeSort,
} from "@/interface/place";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export interface GetMyPlaceProps {
  sort: placeSort;
  category: placeCategory;
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
