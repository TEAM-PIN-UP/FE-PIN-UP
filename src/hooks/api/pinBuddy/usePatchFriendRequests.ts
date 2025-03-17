import patchApi from "@/api/patchApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePatchFriendRequests = () => {
  const queryClient = useQueryClient();

  const acceptFriendRequest = useMutation({
    mutationFn: ({ requestId }: { requestId: number }) =>
      patchApi.acceptFriendRequest({ requestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendships"] });
      queryClient.invalidateQueries({
        queryKey: ["getReceivedFriendRequests"],
      });
    },
    onError: (error) =>
      console.error("Failed to accept friend request:", error),
  });

  const rejectFriendRequest = useMutation({
    mutationFn: ({ requestId }: { requestId: number }) =>
      patchApi.rejectFriendRequest({ requestId }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getReceivedFriendRequests"],
      }),
    onError: (error) =>
      console.error("Failed to reject friend request:", error),
  });

  return { acceptFriendRequest, rejectFriendRequest };
};

export default usePatchFriendRequests;
