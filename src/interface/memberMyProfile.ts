import { MemberDetails } from "./memberDetails";

export interface MemberMyProfileResponse {
  member: MemberDetails;
  reviewCount: number;
  friendCount: number;
  averageRating: number;
  relationType: string;
}
