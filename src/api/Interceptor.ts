import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { handleGlobalError } from './errorHandler';

export const requestInterceptor = {
  success: (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      };
    }
    return config;
  },
  error: (error: AxiosError) => {
    return Promise.reject(error);
  }
};

export const responseInterceptor = {
  success: (response: AxiosResponse) => {
    return response.data;
  },
  error: handleGlobalError
};