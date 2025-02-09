import getApi from "@/api/getApi";
import { GetSpecificPlaceResponse } from "@/interface/apiInterface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const useGetSpecificPlaces = ({
    kakaoPlaceId
}: { kakaoPlaceId: string }): UseQueryResult<GetSpecificPlaceResponse> => {
    const queryFn = async () => {
        const response = await getApi.getSpecificPlace({
            kakaoPlaceId
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