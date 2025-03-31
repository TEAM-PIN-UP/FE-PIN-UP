import customAxios from "./Interceptor";

const patchApi = {
  patchMembers: (formData: FormData) =>
    customAxios.patch(`/api/members`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  acceptFriendRequest: ({ requestId }: { requestId: number | string }) =>
    customAxios.patch(`/api/friend-requests/${requestId}/accept`),
  rejectFriendRequest: ({ requestId }: { requestId: number | string }) =>
    customAxios.patch(`/api/friend-requests/${requestId}/reject`),
};

export default patchApi;
