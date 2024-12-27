import postApi from "@/api/postApi"
import useToastPopup from "@/utils/toastPopup"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useCreateReview = () => {
    const queryClient = useQueryClient();
    const toast = useToastPopup();
    return useMutation({
        mutationFn: (newReview: FormData) => postApi.postCreateReview(newReview),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] })
            toast('리뷰등록이 완료되었습니다.')
        }
    })
}

export default useCreateReview