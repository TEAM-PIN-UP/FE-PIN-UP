import getApi from "@/api/getApi";
import { ReceivedFriendRequestResponse } from "@/interface/member";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const useFriendRequests = (): UseQueryResult<
  ReceivedFriendRequestResponse[]
> => {
  const queryFn = async () => {
    const response = await getApi.getReceivedFriendRequests();
    return response.data;
  };
  return useQuery({ queryFn, queryKey: ["getFriendRequests"] });
};

export default useFriendRequests;
