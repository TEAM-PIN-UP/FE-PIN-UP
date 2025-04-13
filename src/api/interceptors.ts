import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { handleGlobalError } from "./errorHandler";

const baseURL = import.meta.env.VITE_SERVER_ADDRESS;
const apiAxios = axios.create({ baseURL });

export const requestInterceptor = {
  success: (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.set("Authorization", `Bearer ${token}`);

    return config;
  },
  error: (error: AxiosError) => {
    return Promise.reject(error);
  },
};

export const responseInterceptor = {
  success: (response: AxiosResponse) => {
    return response.data;
  },
  error: handleGlobalError,
};

apiAxios.interceptors.request.use(
  requestInterceptor.success,
  requestInterceptor.error
);

apiAxios.interceptors.response.use(
  responseInterceptor.success,
  responseInterceptor.error
);

export default apiAxios;
