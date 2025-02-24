import getApi from "@/api/getApi";
import { GetPinBuddySingle } from "@/interface/apiInterface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const useFriendList = (): UseQueryResult<GetPinBuddySingle[]> => {
  const queryFn = async () => {
    const response = await getApi.getFriendShips();
    return response.data;
  };
  return useQuery({ queryFn, queryKey: ["myPinbuddyList"] });
};

export default useFriendList;
