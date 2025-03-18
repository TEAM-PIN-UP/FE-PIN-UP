import postApi from "@/api/postApi";
import { getMemberResponseObj } from "@/utils/getFromLocalStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostMyPlace = () => {
  const queryClient = useQueryClient();
  const memberResponse = getMemberResponseObj();
  const memberId = memberResponse?.memberId;

  return useMutation({
    mutationFn: ({ kakaoPlaceId }: { kakaoPlaceId: number }) =>
      postApi.postMyPlace({ kakaoPlaceId }),

    onSuccess: () => {
      if (!memberId) {
        console.warn("Cannot invalidate query: memberId is undefined");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["myPlace", memberId] });
    },
  });
};

export default usePostMyPlace;
