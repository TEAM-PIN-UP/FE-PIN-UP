import postApi from "@/api/postApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostFriendRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reveiverId }: { reveiverId: number }) =>
      postApi.postFriendRequest({ reveiverId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequest"] });
    },
  });
};

export default usePostFriendRequest;
