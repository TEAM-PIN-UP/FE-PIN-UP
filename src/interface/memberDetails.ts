export interface MemberDetails {
  memberId: number;
  email: string;
  name: string;
  nickname: string;
  profilePictureUrl: string;
  bio: string;
  termsOfMarketing: "Y" | "N";
}
