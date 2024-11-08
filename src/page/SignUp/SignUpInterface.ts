export type AuthProvider = "kakao" | "naver" | "google";
export type AgreementKey = "tos" | "personalInfo" | "marketing";

export interface SignUpForm {
  authMethod: AuthProvider | "";
  name: string;
  profileImage: string;
  agreedToTerms: AgreementKey[];
}
