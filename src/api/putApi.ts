import customAxios from "./Interceptor";

const putApi = {
  editProfile: (formData: FormData) =>
    customAxios.put(`/api/members`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export default putApi;
