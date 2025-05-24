import { RelationType } from "./place";

export interface MemberDetails {
  averageStarRating: number;
  bio: string;
  email: string;
  loginType: "GOOGLE" | "NAVER" | "KAKAO";
  memberId: number;
  name: string;
  nickname: string;
  pinBuddyCount: number;
  profilePictureUrl: string;
  reviewCount: number;
  termsOfMarketing: "Y" | "N";
}

export interface SignInResponse {
  accessToken: string;
  memberResponse: MemberDetails;
  refreshToken: string;
}

export interface MemberProfileResponse {
  memberResponse: MemberDetails;
  relationType: RelationType;
}

export interface MemberPatchBody {
  request: {
    nickname: string;
    termsOfMarketing: "Y" | "N";
  };
  multipartFile: Blob; // Convert base64 jpeg/png image to blob
}

export interface FriendRequestResponse {
  id: number;
  friendRequestStatus: string;
  sender: MemberDetails;
  receiver: MemberDetails;
}

// Search member
export interface GetPinBuddySearchResponse {
  memberResponse: MemberDetails;
  relationType: RelationType;
  reviewCount: number;
  pinBuddyCount: number;
}
