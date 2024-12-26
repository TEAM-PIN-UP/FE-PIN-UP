// errorHandler.ts
import { AxiosError } from 'axios';
import {
    ErrorCodes,
    ErrorCodeType,
    getErrorMessage
} from './errorCodes';

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

const handleServerError = (errorDetail: ErrorDetail): void => {
    console.error('서버 에러:', errorDetail);
};

const handleClientError = (errorDetail: ErrorDetail): void => {
    console.warn('클라이언트 에러:', errorDetail);
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
    ErrorCodes.Global.SOCIAL_LOGIN_USER_INFO_NOT_FOUND
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
    ErrorCodes.Global.CACHE_KEY_NULL
] as const;

export const handleGlobalError = (error: CustomAxiosError): Promise<never> => {
    const errorCode = error.response?.data?.code;
    const defaultMessage = '알 수 없는 오류가 발생했습니다.';
    const errorMessage = errorCode ? getErrorMessage(errorCode) : defaultMessage;

    if (errorCode?.startsWith('G')) {
        const errorDetail: ErrorDetail = {
            code: errorCode as ErrorCodeType,
            message: errorMessage,
            status: error.response?.status || 500
        };

        // 500번대 서버 에러
        if (SERVER_ERROR_CODES.includes(errorCode as any)) {
            handleServerError(errorDetail);
        }
        // 400번대 클라이언트 에러
        else if (CLIENT_ERROR_CODES.includes(errorCode as any)) {
            handleClientError(errorDetail);
        }

        return Promise.reject(errorDetail);
    }

    // Global 에러가 아닌 경우는 그대로 전달
    return Promise.reject(error);
};