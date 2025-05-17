import deleteApi from "@/api/deleteApi";
import { useToastStore } from "@/stores";
import { getMemberResponseObj } from "@/utils/getFromLocalStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteMyPlace = () => {
  const queryClient = useQueryClient();
  const memberResponse = getMemberResponseObj();
  const memberId = memberResponse?.memberId;
  const { textChange, pop } = useToastStore.getState();

  return useMutation({
    mutationFn: ({ kakaoPlaceId }: { kakaoPlaceId: number | string }) =>
      deleteApi.myPlace({ kakaoPlaceId }),

    onSuccess: () => {
      textChange("북마크가 삭제되었어요.");
      pop(true);
      if (!memberId) {
        console.warn("Cannot invalidate query: memberId is undefined");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["myPlace", memberId] });
    },
  });
};

export default useDeleteMyPlace;
