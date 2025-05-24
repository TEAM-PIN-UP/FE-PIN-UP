import { GetPlaceParams } from "@/interfaces/place";

export const queryKeys = {
  friends: (memberId: number | string) => ["friends", memberId.toString()],
  receivedFriendRequests: (memberId: number | string) => [
    "receivedFriendRequests",
    memberId.toString(),
  ],
  sentFriendRequests: (memberId: number | string) => [
    "sentFriendRequests",
    memberId.toString(),
  ],
  searchMember: (nickname: string) => ["searchMember", nickname],
  places: (place: GetPlaceParams) => ["places", place],
  searchPlaces: (keyword: string) => ["searchPlaces", keyword],
  getProfile: (memberId: number | string) => ["profile", memberId],
  postReview: () => [],
  photoReviews: (memberId: number | string) => ["photoReviews", memberId],
  textReviews: (memberId: number | string) => ["textReviews", memberId],
};
