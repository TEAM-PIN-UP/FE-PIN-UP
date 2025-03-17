import customAxios from "./Interceptor";

const deleteApi = {
  myPlace: ({ kakaoPlaceId }: { kakaoPlaceId: number }) =>
    customAxios.delete(`/api/bookmarks/${kakaoPlaceId}`),
  cancelFriendRequest: ({ requestId }: { requestId: number | string }) =>
    customAxios.delete(`/api/friend-requests/${requestId}`),
  deleteFriend: ({ friendId }: { friendId: number | string }) =>
    customAxios.delete(`/api/friendships/${friendId}`),
};

export default deleteApi;
