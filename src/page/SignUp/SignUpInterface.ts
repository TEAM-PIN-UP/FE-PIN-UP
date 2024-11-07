export type AuthProvider = "kakao" | "naver" | "google";

export interface Terms {
  tos: boolean;
  personalInfo: boolean;
  marketing: boolean;
}

export interface SignUpForm {
  authMethod: AuthProvider | "";
  name: string;
  profileImage: string;
  agreedToTerms: Terms;
}
