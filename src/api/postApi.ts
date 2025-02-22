import customAxios from "./Interceptor";

const postApi = {
  postCreateReview: (formData: FormData) =>
    customAxios.post(`/api/reviews`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  postFriendRequest: ({ receiverId }: { receiverId: number }) =>
    customAxios.post(`/api/friend-requests/send`, {
      receiverId: receiverId,
    }),
  postMyPlace: ({ kakaoPlaceId }: { kakaoPlaceId: number }) =>
    customAxios.post(`/api/bookmarks`, { kakaoPlaceId }),
};

export default postApi;
