import getApi from "@/api/getApi";
import { MemberProfileResponse } from "@/interfaces/member";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

const useProfileDetails = (
  id: number | string | undefined
): UseQueryResult<MemberProfileResponse> => {
  const queryFn = async () => {
    try {
      if (id === undefined) throw Error;
      const response = await getApi.getMemberDetails(id);
      return response.data;
    } catch (error) {
      console.error("Cannot fetch profile details:", error);
    }
  };
  return useQuery({
    queryFn,
    enabled: !!id,
    queryKey: queryKeys.getProfile(id!),
  });
};

export default useProfileDetails;
