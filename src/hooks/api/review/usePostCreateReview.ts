import postApi from "@/api/postApi";
import { getMemberResponseObj } from "@/utils/getFromLocalStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

const useCreateReview = () => {
  const memberResponse = getMemberResponseObj();
  const memberId = memberResponse?.memberId;

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newReview: FormData) => postApi.postCreateReview(newReview),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      if (memberId)
        queryClient.invalidateQueries({
          queryKey: queryKeys.photoReviews(memberId),
        });
      else console.error("No member id for invalidating my review cache.");
    },
  });
};

export default useCreateReview;
