import apiAxios from "./interceptors";

const deleteApi = {
  myPlace: ({ kakaoPlaceId }: { kakaoPlaceId: number | string }) =>
    apiAxios.delete(`/api/bookmarks/${kakaoPlaceId}`),
  cancelFriendRequest: ({ requestId }: { requestId: number | string }) =>
    apiAxios.delete(`/api/friend-requests/${requestId}`),
  deleteFriend: ({ friendId }: { friendId: number | string }) =>
    apiAxios.delete(`/api/friendships/${friendId}`),
};

export default deleteApi;
