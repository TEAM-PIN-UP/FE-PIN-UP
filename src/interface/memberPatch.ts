// 소셜 로그인 후처리
// 닉네임, 프로필사진, 마케팅 수신동의 여부 등록

export interface MemberPatchBody {
  request: {
    nickname: string;
    termsOfMarketing: "Y" | "N";
  };
  multipartFile: Blob; // !! Convert base64 jpeg/png image to blob
}
