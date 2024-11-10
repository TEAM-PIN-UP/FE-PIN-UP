import customAxios from "./Interceptor";

const postApi = {
  postReview: () => customAxios.post(`/api/places/reviews`),
  postFriendRequest: () => customAxios.post(`/api/friend-request/send`),
};

export default postApi;
