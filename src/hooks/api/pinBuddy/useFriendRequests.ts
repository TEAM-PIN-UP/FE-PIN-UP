import getApi from "@/api/getApi";
import { FriendRequestResponse } from "@/interfaces/member";
import { getMemberResponseObj } from "@/utils/getFromLocalStorage";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

export const useReceivedFriendRequests = (): UseQueryResult<
  FriendRequestResponse[]
> => {
  const memberResponse = getMemberResponseObj();
  const memberId = memberResponse?.memberId;

  const queryFn = async () => {
    if (!memberId) {
      console.error("Cannot use query key");
      return;
    }
    const response = await getApi.getReceivedFriendRequests();
    return response.data.content;
  };
  return useQuery({
    queryFn,
    enabled: !!memberId,
    queryKey: queryKeys.receivedFriendRequests(memberId!),
  });
};

export const useSentFriendRequests = (): UseQueryResult<
  FriendRequestResponse[]
> => {
  const memberResponse = getMemberResponseObj();
  const memberId = memberResponse?.memberId;

  const queryFn = async () => {
    if (!memberId) {
      console.error("Cannot use query key");
      return;
    }
    const response = await getApi.getSentFriendRequests();
    return response.data.content;
  };
  return useQuery({
    queryFn,
    enabled: !!memberId,
    queryKey: queryKeys.sentFriendRequests(memberId!),
  });
};
