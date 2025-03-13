import getApi from "@/api/getApi";
import { MemberProfileResponse } from "@/interface/member";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const useProfileDetails = ({
  id,
}: {
  id: number | undefined;
}): UseQueryResult<MemberProfileResponse> => {
  const queryFn = async () => {
    try {
      if (id === undefined) throw Error;
      const response = await getApi.getMemberDetails({ id });
      return response.data;
    } catch (error) {
      console.error("Cannot fetch profile details:", error);
    }
  };
  return useQuery({ queryFn, queryKey: [`profileDetails-${id}`] });
};

export default useProfileDetails;
