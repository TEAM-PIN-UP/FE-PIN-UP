import deleteApi from "@/api/deleteApi";
import { getMemberResponseObj } from "@/utils/getFromLocalStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteMyPlace = () => {
  const queryClient = useQueryClient();
  const memberResponse = getMemberResponseObj();
  const memberId = memberResponse?.memberId;

  return useMutation({
    mutationFn: ({ kakaoPlaceId }: { kakaoPlaceId: number }) =>
      deleteApi.myPlace({ kakaoPlaceId }),

    onSuccess: () => {
      if (!memberId) {
        console.warn("Cannot invalidate query: memberId is undefined");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["myPlace", memberId] });
    },
  });
};

export default useDeleteMyPlace;
