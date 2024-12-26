import getApi from "@/api/getApi";
import { getSearchPlacesRequest, getSearchPlacesResponse } from "@/interface/apiInterface";
import { useQuery, UseQueryResult } from "@tanstack/react-query"

const useGetSearchPlaces = ({ keyword }: getSearchPlacesRequest): UseQueryResult<getSearchPlacesResponse[]> => {
    const queryFn = async () => {
        const response = await getApi.getSearchPlaces({ keyword })
        return response.data.content;
    }
    return useQuery({
        queryFn,
        queryKey: ['searchPlaces', keyword],
        enabled: Boolean(keyword),
        retry: 1,
        staleTime: 1000 * 60 * 5,
    });
}

export default useGetSearchPlaces