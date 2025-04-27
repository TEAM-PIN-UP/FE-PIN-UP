import postApi from "@/api/postApi";
import { useToastStore } from "@/store";
import { getMemberResponseObj } from "@/utils/getFromLocalStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostMyPlace = () => {
  const queryClient = useQueryClient();
  const memberResponse = getMemberResponseObj();
  const memberId = memberResponse?.memberId;
  const { textChange, pop } = useToastStore.getState();

  return useMutation({
    mutationFn: ({ kakaoPlaceId }: { kakaoPlaceId: number | string }) =>
      postApi.postMyPlace({ kakaoPlaceId }),

    onSuccess: () => {
      textChange("북마크가 등록되었어요.");
      pop(true);
      if (!memberId) {
        console.warn("Cannot invalidate query: memberId is undefined");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["myPlace", memberId] });
    },
  });
};

export default usePostMyPlace;
