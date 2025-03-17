import deleteApi from "@/api/deleteApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteFriendRequests = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId }: { requestId: number }) =>
      deleteApi.cancelFriendRequest({ requestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getSentFriendRequests"],
      });
    },
    onError: (error) =>
      console.error("Failed to delete friend request:", error),
  });
};

export default useDeleteFriendRequests;
