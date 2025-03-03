import getApi from "@/api/getApi";
import { MemberDetails } from "@/interface/member";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const useFriendList = (): UseQueryResult<MemberDetails[]> => {
  const queryFn = async () => {
    const response = await getApi.getFriendShips();
    return response.data;
  };
  return useQuery({ queryFn, queryKey: ["myPinbuddyList"] });
};

export default useFriendList;
