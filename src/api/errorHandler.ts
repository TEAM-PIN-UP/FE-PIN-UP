// errorHandler.ts
import { useToastStore } from "@/store";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { ErrorCodes, ErrorCodeType, getErrorMessage } from "./errorCodes";

interface ApiErrorResponse {
  code: ErrorCodeType;
  message: string;
  status: number;
}

type CustomAxiosError = AxiosError<ApiErrorResponse>;

interface ErrorDetail {
  code: ErrorCodeType;
  message: string;
  status: number;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const { textChange, pop } = useToastStore.getState();

const handleServerError = (errorDetail: ErrorDetail): void => {
  textChange(errorDetail.message);
  pop(true);
  console.error("서버 에러:", errorDetail);
};

const handleClientError = (errorDetail: ErrorDetail): void => {
  textChange(errorDetail.message);
  pop(true);
  console.warn("클라이언트 에러:", errorDetail);
};

const SERVER_ERROR_CODES = [
  ErrorCodes.Global.INTERNAL_SERVER_ERROR,
  ErrorCodes.Global.FILE_CONVERT_FAIL,
  ErrorCodes.Global.ENTITY_TYPE_INVALID,
  ErrorCodes.Global.FILTER_MUST_RESPOND,
  ErrorCodes.Global.FILE_DELETE_ERROR,
  ErrorCodes.Global.CACHE_SERIALIZATION_ERROR,
  ErrorCodes.Global.CACHE_DESERIALIZATION_ERROR,
  ErrorCodes.Global.CACHE_OPERATION_ERROR,
  ErrorCodes.Global.SOCIAL_LOGIN_TOKEN_NOT_FOUND,
  ErrorCodes.Global.SOCIAL_LOGIN_USER_INFO_NOT_FOUND,
] as const;

const CLIENT_ERROR_CODES = [
  ErrorCodes.Global.METHOD_NOT_ALLOWED,
  ErrorCodes.Global.INPUT_VALUE_INVALID,
  ErrorCodes.Global.INPUT_TYPE_INVALID,
  ErrorCodes.Global.HTTP_MESSAGE_NOT_READABLE,
  ErrorCodes.Global.HTTP_HEADER_INVALID,
  ErrorCodes.Global.FILE_EXTENSION_INVALID,
  ErrorCodes.Global.VALIDATION_FAILED,
  ErrorCodes.Global.IMAGES_LIMIT_EXCEEDED,
  ErrorCodes.Global.INVALID_FILE_URL,
  ErrorCodes.Global.CACHE_KEY_NULL,
] as const;

export const handleGlobalError = async (error: CustomAxiosError) => {
  const errorCode = error.response?.data?.code;
  const defaultMessage = "알 수 없는 오류가 발생했습니다.";
  const errorMessage = errorCode ? getErrorMessage(errorCode) : defaultMessage;

  // Refresh on expired token
  if (errorCode === "AU006") {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (!originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        const baseURL = import.meta.env.VITE_SERVER_ADDRESS;
        try {
          const refreshResponse = await axios.post(
            `${baseURL}/api/auth/refresh`,
            null,
            { headers: { Refresh: refreshToken } }
          );

          const newAccessToken = refreshResponse.data.data.accessToken;
          const newRefreshToken = refreshResponse.data.data.refreshToken;
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return (await axios.request(originalRequest)).data;
        } catch (refreshError) {
          console.error("토큰 갱신 실패:", refreshError);
          const errorDetail: ErrorDetail = {
            code: errorCode as ErrorCodeType,
            message: errorMessage,
            status: error.response?.status || 500,
          };
          return await Promise.reject(errorDetail);
        }
      }
    }
  }

  if (errorCode?.startsWith("G")) {
    const errorDetail: ErrorDetail = {
      code: errorCode as ErrorCodeType,
      message: errorMessage,
      status: error.response?.status || 500,
    };

    // 500번대 서버 에러
    if (SERVER_ERROR_CODES.map(String).includes(String(errorCode))) {
      handleServerError(errorDetail);
    }
    // 400번대 클라이언트 에러
    else if (CLIENT_ERROR_CODES.map(String).includes(String(errorCode))) {
      handleClientError(errorDetail);
    }

    return Promise.reject(errorDetail);
  }

  // Global 에러가 아닌 경우는 그대로 전달
  return Promise.reject(error);
};
