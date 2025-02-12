import postApi from "@/api/postApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostMyPlace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ kakaoPlaceId }: { kakaoPlaceId: number }) =>
      postApi.postMyPlace({ kakaoPlaceId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myplace"] });
    },
  });
};

export default usePostMyPlace;
