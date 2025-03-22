import postApi from "@/api/postApi";
import { getMemberResponseObj } from "@/utils/getFromLocalStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

const usePostFriendRequests = () => {
  const queryClient = useQueryClient();
  const memberResponse = getMemberResponseObj();
  const memberId = memberResponse?.memberId;

  return useMutation({
    mutationFn: ({ receiverId }: { receiverId: number | string }) =>
      postApi.postSendFriendRequest({ receiverId }),

    onSuccess: (_, { receiverId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.receivedFriendRequests(receiverId),
      });
      queryClient.invalidateQueries({ queryKey: ["searchMember"] });
      if (!memberId) {
        console.warn("Cannot invalidate query: memberId is undefined");
        return;
      }
      queryClient.invalidateQueries({
        queryKey: queryKeys.sentFriendRequests(memberId),
      });
    },
  });
};

export default usePostFriendRequests;
