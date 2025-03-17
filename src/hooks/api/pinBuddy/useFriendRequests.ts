import getApi from "@/api/getApi";
import { FriendRequestResponse } from "@/interface/member";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useReceivedFriendRequests = (): UseQueryResult<
  FriendRequestResponse[]
> => {
  const queryFn = async () => {
    const response = await getApi.getReceivedFriendRequests();
    return response.data;
  };
  return useQuery({ queryFn, queryKey: ["getReceivedFriendRequests"] });
};

export const useSentFriendRequests = (): UseQueryResult<
  FriendRequestResponse[]
> => {
  const queryFn = async () => {
    const response = await getApi.getSentFriendRequests();
    return response.data;
  };
  return useQuery({ queryFn, queryKey: ["getSentFriendRequests"] });
};
