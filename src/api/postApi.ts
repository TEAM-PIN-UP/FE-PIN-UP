import customAxios from "./Interceptor";

const postApi = {
  postCreateReview: (formData: FormData) =>
    customAxios.post(`/api/reviews`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  postFriendRequest: () => customAxios.post(`/api/friend-request/send`),
  postMyPlace: ({ kakaoPlaceId }: { kakaoPlaceId: number }) =>
    customAxios.post(`/api/bookmarks`, { kakaoPlaceId }),
};

export default postApi;
