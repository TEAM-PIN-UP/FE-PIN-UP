import postApi from "@/api/postApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostFriendRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ receiverId }: { receiverId: number }) =>
      postApi.postFriendRequest({ receiverId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["searchPinbuddy"] });
    },
  });
};

export default usePostFriendRequest;
