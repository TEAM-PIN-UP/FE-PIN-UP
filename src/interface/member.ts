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

export interface MemberProfileResponse {
  memberResponse: MemberDetails;
  relationType: string;
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
