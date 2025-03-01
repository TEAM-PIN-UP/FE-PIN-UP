import postApi from "@/api/postApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newReview: FormData) => postApi.postCreateReview(newReview),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export default useCreateReview;
