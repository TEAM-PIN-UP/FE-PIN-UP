import deleteApi from "@/api/deleteApi";
import { FriendRequestResponse } from "@/interfaces/member";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

const useDeleteFriendRequests = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ request }: { request: FriendRequestResponse }) =>
      deleteApi.cancelFriendRequest({ requestId: request.id }),

    onSuccess: (_, { request }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.sentFriendRequests(request.sender.memberId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.receivedFriendRequests(request.receiver.memberId),
      });
    },
    onError: (error) =>
      console.error("Failed to delete friend request:", error),
  });
};

export default useDeleteFriendRequests;
