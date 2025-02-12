import customAxios from "./Interceptor";

const deleteApi = {
  deleteMyPlace: ({ kakaoPlaceId }: { kakaoPlaceId: number }) =>
    customAxios.delete(`/api/bookmarks/${kakaoPlaceId}`),
};

export default deleteApi;
