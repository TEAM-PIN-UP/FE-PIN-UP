import { postCreateReviewRequest } from "@/interface/apiInterface";
import customAxios from "./Interceptor";

const postApi = {
  postCreateReview: (data: postCreateReviewRequest) => customAxios.post(`/api/places/reviews`, data),
  postFriendRequest: () => customAxios.post(`/api/friend-request/send`),
};

export default postApi;
