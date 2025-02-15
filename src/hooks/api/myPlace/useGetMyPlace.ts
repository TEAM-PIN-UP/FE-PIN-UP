import getApi from "@/api/getApi";
import {
  GetMyPlaceResponse,
  placeCategory,
  placeSort,
} from "@/interface/apiInterface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export interface getMyPlaceProps {
  sort: placeSort;
  category: placeCategory;
}

const useGetMyPlace = ({
  sort,
  category,
}: getMyPlaceProps): UseQueryResult<GetMyPlaceResponse[]> => {
  const queryFn = async () => {
    const response = await getApi.getMyPlace({ sort, category });
    return response.data;
  };
  return useQuery({
    queryFn,
    queryKey: ["myplace"],
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetMyPlace;
