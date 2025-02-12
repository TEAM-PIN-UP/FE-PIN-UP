import postApi from "@/api/postApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface createReviewProp {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaceId: React.Dispatch<React.SetStateAction<string>>;
}

const useCreateReview = ({ setModalOpen, setPlaceId }: createReviewProp) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newReview: FormData) => postApi.postCreateReview(newReview),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setPlaceId(data);
      setModalOpen(true);
    },
  });
};

export default useCreateReview;
