import { Review } from "./review";

export interface MemberDetails {
  averageStarRating: number;
  bio: string;
  email: string;
  memberId: number;
  name: string;
  nickname: string;
  pinBuddyCount: number;
  profilePictureUrl: string;
  reviewCount: number;
  termsOfMarketing: "Y" | "N";
}

export interface MemberMyProfileResponse {
  memberResponse: MemberDetails;
  relationType: string;
  memberReviews: Review[];
}

export interface MemberPatchBody {
  request: {
    nickname: string;
    termsOfMarketing: "Y" | "N";
  };
  multipartFile: Blob; // Convert base64 jpeg/png image to blob
}

export interface ReceivedFriendRequestResponse {
  id: number;
  friendRequestStatus: string;
  sender: MemberDetails;
  receiver: MemberDetails;
}
