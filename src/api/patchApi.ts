import apiAxios from "./interceptors";

const patchApi = {
  patchMembers: (formData: FormData) =>
    apiAxios.patch(`/api/members`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  acceptFriendRequest: ({ requestId }: { requestId: number | string }) =>
    apiAxios.patch(`/api/friend-requests/${requestId}/accept`),
  rejectFriendRequest: ({ requestId }: { requestId: number | string }) =>
    apiAxios.patch(`/api/friend-requests/${requestId}/reject`),
};

export default patchApi;
