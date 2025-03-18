import deleteApi from "@/api/deleteApi";
import { getMemberResponseObj } from "@/utils/getFromLocalStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

const useDeleteFriend = () => {
  const queryClient = useQueryClient();
  const memberResponse = getMemberResponseObj();
  const memberId = memberResponse?.memberId;

  return useMutation({
    mutationFn: ({ friendId }: { friendId: number }) =>
      deleteApi.deleteFriend({ friendId }),

    onSuccess: (_, { friendId }) => {
      if (!memberId) {
        console.warn("Cannot invalidate query: memberId is undefined");
        return;
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.friends(memberId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.friends(friendId) });
    },
    onError: (error) => console.error("Failed to delete friend:", error),
  });
};

export default useDeleteFriend;
