import deleteApi from "@/api/deleteApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteMyPlace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ kakaoPlaceId }: { kakaoPlaceId: number }) =>
      deleteApi.deleteMyPlace({ kakaoPlaceId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myplace"] });
    },
  });
};

export default useDeleteMyPlace;
