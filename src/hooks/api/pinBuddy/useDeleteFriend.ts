import deleteApi from "@/api/deleteApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ friendId }: { friendId: number }) =>
      deleteApi.deleteFriend({ friendId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friendships"],
      });
    },
    onError: (error) => console.error("Failed to delete friend:", error),
  });
};

export default useDeleteFriend;
