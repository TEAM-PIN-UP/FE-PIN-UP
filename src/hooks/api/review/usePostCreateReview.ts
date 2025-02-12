import postApi from "@/api/postApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface createReviewProp {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setKakaoPlaceId: React.Dispatch<React.SetStateAction<string>>;
}

const useCreateReview = ({
  setModalOpen,
  setKakaoPlaceId,
}: createReviewProp) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newReview: FormData) => postApi.postCreateReview(newReview),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setKakaoPlaceId(data);
      setModalOpen(true);
    },
  });
};

export default useCreateReview;
