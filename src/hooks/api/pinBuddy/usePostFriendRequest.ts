import postApi from "@/api/postApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostFriendRequests = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ receiverId }: { receiverId: number }) =>
      postApi.postSendFriendRequest({ receiverId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["searchPinbuddy"] });
    },
  });
};

export default usePostFriendRequests;
