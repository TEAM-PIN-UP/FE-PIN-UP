import apiAxios from "./interceptors";

const putApi = {
  editProfile: (formData: FormData) =>
    apiAxios.put(`/api/members`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export default putApi;
