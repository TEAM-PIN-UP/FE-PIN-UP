import customAxios from "./Interceptor";

const patchApi = {
  patchMembers: (formData: FormData) =>
    customAxios.patch(`/api/members`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default patchApi;
