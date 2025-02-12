import getApi from "@/api/getApi";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const useGetMyPlace = (): UseQueryResult => {
  const queryFn = async () => {
    const response = await getApi.getMyPlace();
    return response.data;
  };
  return useQuery({ queryFn, queryKey: ["myplace"] });
};

export default useGetMyPlace;
