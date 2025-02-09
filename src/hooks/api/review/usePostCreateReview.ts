import postApi from "@/api/postApi";
import useToastPopup from "@/utils/toastPopup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useCreateReview = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToastPopup();
  return useMutation({
    mutationFn: (newReview: FormData) => postApi.postCreateReview(newReview),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast("리뷰등록이 완료되었습니다.");
      navigate(`/map?placeId=${data}`);
    },
  });
};

export default useCreateReview;
