import getApi from "@/api/getApi";
import { MemberMyProfileResponse } from "@/interface/member";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const useMyFeed = (): UseQueryResult<MemberMyProfileResponse> => {
  const queryFn = async () => {
    const response = await getApi.getMyFeed();
    return response.data;
  };
  return useQuery({ queryFn, queryKey: ["myFeed"] });
};

export default useMyFeed;
