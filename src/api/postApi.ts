import apiAxios from "./interceptors";

const postApi = {
  postCreateReview: (formData: FormData) =>
    apiAxios.post(`/api/reviews`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  postSendFriendRequest: ({ receiverId }: { receiverId: number | string }) =>
    apiAxios.post(`/api/friend-requests/send`, {
      receiverId: receiverId,
    }),
  postMyPlace: ({ kakaoPlaceId }: { kakaoPlaceId: number | string }) =>
    apiAxios.post(`/api/bookmarks`, { kakaoPlaceId }),
};

export default postApi;
