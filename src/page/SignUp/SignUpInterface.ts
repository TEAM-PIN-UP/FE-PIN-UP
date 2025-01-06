export type AuthProvider = "kakao" | "naver" | "google";
// 이용약관 동의, 개인정보 수집, 위치정보 수집, 마케팅 수신
export type AgreementKey = "TOA" | "TOP" | "TOG" | "TOM";

export interface SignUpForm {
  authMethod: AuthProvider | "";
  nickname: string;
  profileImage: string;
  agreedToTerms: AgreementKey[];
}

export interface MemberResponse {
  memberId: number;
  email: string;
  name: string;
  nickname: string;
  profilePictureUrl: string;
  bio: string;
  termsOfMarketing: "Y" | "N";
}
