export type AuthProvider = "kakao" | "naver" | "google";
export type AgreementKey = "TOA" | "TOP" | "TOG" | "TOM";

export interface SignUpForm {
  authMethod: AuthProvider | "";
  nickname: string;
  profileImage: string;
  agreedToTerms: AgreementKey[];
}
