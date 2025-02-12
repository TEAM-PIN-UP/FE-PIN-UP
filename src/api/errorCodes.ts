// errorCodes.ts

// Global Error Codes
export type GlobalErrorCodeType =
    | 'G001' | 'G002' | 'G003' | 'G004' | 'G005'
    | 'G006' | 'G007' | 'G008' | 'G009' | 'G010'
    | 'G011' | 'G012' | 'G013' | 'G014' | 'G015'
    | 'G016' | 'G17' | 'G018' | 'G019' | 'G020';

// Auth Error Codes
export type AuthErrorCodeType =
    | 'AU001' | 'AU002' | 'AU003' | 'AU004' | 'AU005' | 'AU006';

// Member Error Codes
export type MemberErrorCodeType =
    | 'M001' | 'M002' | 'M003' | 'M004' | 'M005';

// Review Error Codes
export type ReviewErrorCodeType = 'R001';

// Place Error Codes
export type PlaceErrorCodeType = 'P001';

// Friend Error Codes
export type FriendErrorCodeType =
    | 'F001' | 'F002' | 'F003' | 'F004'
    | 'F005' | 'F006' | 'F007' | 'F008';

// Alarm Error Codes
export type AlarmErrorCodeType =
    | 'AL001' | 'AL002' | 'AL003';

// Article Error Codes
export type ArticleErrorCodeType = 'AR001';

// 모든 에러 코드 타입 통합
export type ErrorCodeType =
    | GlobalErrorCodeType
    | AuthErrorCodeType
    | MemberErrorCodeType
    | ReviewErrorCodeType
    | PlaceErrorCodeType
    | FriendErrorCodeType
    | AlarmErrorCodeType
    | ArticleErrorCodeType;

// Error Code Constants
export const ErrorCodes = {
    // Global
    Global: {
        INTERNAL_SERVER_ERROR: 'G001',
        METHOD_NOT_ALLOWED: 'G002',
        INPUT_VALUE_INVALID: 'G003',
        INPUT_TYPE_INVALID: 'G004',
        HTTP_MESSAGE_NOT_READABLE: 'G005',
        HTTP_HEADER_INVALID: 'G006',
        FILE_EXTENSION_INVALID: 'G007',
        FILE_CONVERT_FAIL: 'G008',
        ENTITY_TYPE_INVALID: 'G009',
        FILTER_MUST_RESPOND: 'G010',
        FILE_DELETE_ERROR: 'G011',
        CACHE_SERIALIZATION_ERROR: 'G012',
        CACHE_DESERIALIZATION_ERROR: 'G013',
        CACHE_OPERATION_ERROR: 'G014',
        VALIDATION_FAILED: 'G015',
        IMAGES_LIMIT_EXCEEDED: 'G016',
        INVALID_FILE_URL: 'G17',
        CACHE_KEY_NULL: 'G018',
        SOCIAL_LOGIN_TOKEN_NOT_FOUND: 'G019',
        SOCIAL_LOGIN_USER_INFO_NOT_FOUND: 'G020'
    },

    // Auth
    Auth: {
        INVALID_TOKEN: 'AU001',
        NOT_EXPIRED_ACCESS_TOKEN: 'AU002',
        FORBIDDEN: 'AU003',
        EXPIRED_OR_PREVIOUS_REFRESH_TOKEN: 'AU004',
        ACCESS_DENIED: 'AU005',
        EXPIRED_ACCESS_TOKEN: 'AU006'
    },

    // Member
    Member: {
        MEMBER_NOT_FOUND: 'M001',
        ALREADY_EXIST_NICKNAME: 'M002',
        ALREADY_EXIST_EMAIL: 'M003',
        PASSWORD_MISMATCH: 'M004',
        NICKNAME_UPDATE_TIME_LIMIT: 'M005'
    },

    // Review
    Review: {
        REVIEW_NOT_FOUND: 'R001'
    },

    // Place
    Place: {
        PLACE_NOT_FOUND: 'P001'
    },

    // Friend
    Friend: {
        ALREADY_EXIST_FRIEND_REQUEST: 'F001',
        SELF_FRIEND_REQUEST: 'F002',
        ALREADY_PROCESSED_FRIEND_REQUEST: 'F003',
        FRIEND_REQUEST_NOT_FOUND: 'F004',
        FRIENDSHIP_NOT_FOUND: 'F005',
        FRIEND_NOT_FOUND: 'F006',
        ALREADY_FRIEND: 'F007',
        FRIEND_REQUEST_RECEIVER_MISMATCH: 'F008'
    },

    // Alarm
    Alarm: {
        SSE_CONNECTION_ERROR: 'AL001',
        ALARM_NOT_FOUND: 'AL002',
        UNAUTHORIZED_ALARM_ACCESS: 'AL003'
    },

    // Article
    Article: {
        ARTICLE_NOT_FOUND: 'AR001'
    }
} as const;

// Error Messages
const errorMessages: Record<ErrorCodeType, string> = {
    // Global
    'G001': '내부 서버 오류입니다.',
    'G002': '허용되지 않은 HTTP method입니다.',
    'G003': '유효하지 않은 입력입니다.',
    'G004': '입력 타입이 유효하지 않습니다.',
    'G005': 'request message body가 없거나, 값 타입이 올바르지 않습니다.',
    'G006': 'request header가 유효하지 않습니다.',
    'G007': '지원하지 않는 파일 포맷입니다.',
    'G008': '변환할 수 없는 파일입니다.',
    'G009': '올바르지 않은 entity type 입니다.',
    'G010': '필터에서 처리해야 할 요청이 Controller에 접근하였습니다.',
    'G011': '파일 삭제 중 오류가 발생했습니다.',
    'G012': '캐시 데이터 직렬화 중 오류가 발생했습니다.',
    'G013': '캐시 데이터 역직렬화 중 오류가 발생했습니다.',
    'G014': '캐시 작업 중 오류가 발생했습니다.',
    'G015': '입력값 유효성 검사에 실패하였습니다.',
    'G016': '등록 가능한 이미지 갯수를 초과했습니다.',
    'G17': '잘못된 파일 URL 형식입니다.',
    'G018': '캐시 키는 null일 수 없습니다.',
    'G019': '소셜 로그인 서버로부터 발급된 Access Token이 없습니다.',
    'G020': '소셜 로그인 서버에서 조회한 유저 정보가 없습니다.',

    // Auth
    'AU001': '유효하지 않은 토큰입니다.',
    'AU002': '만료되지 않은 Access Token입니다.',
    'AU003': '접근할 수 있는 권한이 없습니다.',
    'AU004': '만료되었거나 이전에 발급된 Refresh Token입니다.',
    'AU005': '유효한 인증 정보가 아닙니다.',
    'AU006': 'Access Token이 만료되었습니다. 토큰을 재발급해주세요.',

    // Member
    'M001': '존재하지 않는 유저입니다.',
    'M002': '중복된 닉네임입니다.',
    'M003': '이미 가입된 이메일입니다.',
    'M004': '비밀번호가 일치하지 않습니다.',
    'M005': '닉네임은 30일에 한 번만 변경할 수 있습니다.',

    // Review
    'R001': '존재하지 않는 리뷰입니다.',

    // Place
    'P001': '존재하지 않는 장소입니다.',

    // Friend
    'F001': '이미 존재하는 친구 요청입니다.',
    'F002': '자기 자신에게 친구 요청을 보낼 수 없습니다.',
    'F003': '이미 처리된 친구 요청입니다.',
    'F004': '존재하지 않는 친구 요청입니다.',
    'F005': '존재하지 않는 친구 관계입니다.',
    'F006': '해당 이름을 가진 친구를 찾을 수 없습니다.',
    'F007': '이미 친구 관계입니다.',
    'F008': '현재 사용자가 친구 요청의 수신자가 아닙니다.',

    // Alarm
    'AL001': 'SSE 연결 중 오류가 발생했습니다.',
    'AL002': '존재하지 않는 알람입니다.',
    'AL003': '해당 알람에 접근할 권한이 없습니다.',

    // Article
    'AR001': '존재하지 않는 아티클입니다.'
};

export const getErrorMessage = (code: ErrorCodeType): string => {
    return errorMessages[code] || '알 수 없는 오류가 발생했습니다.';
};