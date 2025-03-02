import { Review } from "./review";

export interface MemberDetails {
  bio: string;
  email: string;
  memberId: number;
  name: string;
  nickname: string;
  profilePictureUrl: string;
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

export interface MyFeed {
  averageStarRating: number;
  memberResponse: MemberDetails;
  memberReviews: Review[];
  pinBuddyCount: number;
  reviewCount: number;
}

export interface ReceivedFriendRequestResponse {
  id: number;
  friendRequestStatus: string;
  sender: MemberDetails;
  receiver: MemberDetails;
}
