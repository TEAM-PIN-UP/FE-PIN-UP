export type AuthProvider = "kakao" | "naver" | "google";

export interface SignUpForm {
  loginMethod: AuthProvider | "";
  name: string;
  profileImage: string;
  agreedToTerms: boolean;
}
