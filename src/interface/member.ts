export interface MemberDetails {
  memberId: number;
  email: string;
  name: string;
  nickname: string;
  profilePictureUrl: string;
  bio: string;
  termsOfMarketing: "Y" | "N";
}

export interface MemberMyProfileResponse {
  member: MemberDetails;
  reviewCount: number;
  friendCount: number;
  averageRating: number;
  relationType: string;
}

export interface MemberPatchBody {
  request: {
    nickname: string;
    termsOfMarketing: "Y" | "N";
  };
  multipartFile: Blob; // Convert base64 jpeg/png image to blob
}
