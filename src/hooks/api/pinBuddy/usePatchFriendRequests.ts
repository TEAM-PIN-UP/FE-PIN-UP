import patchApi from "@/api/patchApi";
import { FriendRequestResponse } from "@/interfaces/member";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

const usePatchFriendRequests = () => {
  const queryClient = useQueryClient();

  const onSuccess = (
    _: unknown,
    { request }: { request: FriendRequestResponse }
  ) => {
    const { sender, receiver } = request;
    [
      queryKeys.friends(sender.memberId),
      queryKeys.friends(receiver.memberId),
      queryKeys.receivedFriendRequests(receiver.memberId),
      queryKeys.sentFriendRequests(sender.memberId),
    ].forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
  };

  const acceptFriendRequest = useMutation({
    mutationFn: ({ request }: { request: FriendRequestResponse }) =>
      patchApi.acceptFriendRequest({ requestId: request.id }),
    onSuccess,
    onError: (error) =>
      console.error("Failed to accept friend request:", error),
  });

  const rejectFriendRequest = useMutation({
    mutationFn: ({ request }: { request: FriendRequestResponse }) =>
      patchApi.rejectFriendRequest({ requestId: request.id }),
    onSuccess,
    onError: (error) =>
      console.error("Failed to reject friend request:", error),
  });

  return { acceptFriendRequest, rejectFriendRequest };
};

export default usePatchFriendRequests;
