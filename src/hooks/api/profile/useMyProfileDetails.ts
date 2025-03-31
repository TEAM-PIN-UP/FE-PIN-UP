import getApi from "@/api/getApi";
import { MemberProfileResponse } from "@/interface/member";
import { getMemberResponseObj } from "@/utils/getFromLocalStorage";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

const useMyProfileDetails = (): UseQueryResult<MemberProfileResponse> => {
  const memberResponse = getMemberResponseObj();
  if (!memberResponse) console.error("No member id for my profile details");

  const queryFn = async () => {
    try {
      const response = await getApi.getMyDetails();
      return response.data;
    } catch (error) {
      console.error("Cannot fetch profile details:", error);
    }
  };
  return useQuery({
    queryFn,
    enabled: !!memberResponse?.memberId,
    queryKey: queryKeys.getProfile(memberResponse!.memberId),
  });
};

export default useMyProfileDetails;
