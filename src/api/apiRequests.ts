import apiAxios from "./interceptors";

/**
 * Redefine CRUD operations with proper return typing
 */
const apiGet = async <T>(
  url: string,
  params?: Record<string, unknown>
): Promise<T> => {
  return apiAxios.get<T, T>(url, { params });
};

const apiPost = async <T, D = unknown>(url: string, data?: D): Promise<T> => {
  return apiAxios.post<T, T, D>(url, data);
};

const apiPut = async <T, D = unknown>(url: string, data?: D): Promise<T> => {
  return apiAxios.put<T, T, D>(url, data);
};

const apiPatch = async <T, D = unknown>(url: string, data?: D): Promise<T> => {
  return apiAxios.patch<T, T, D>(url, data);
};

const apiDelete = async <T>(
  url: string,
  params?: Record<string, unknown>
): Promise<T> => {
  return apiAxios.delete<T, T>(url, { params });
};

export { apiDelete, apiGet, apiPatch, apiPost, apiPut };
