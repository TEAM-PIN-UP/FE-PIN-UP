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
  searchMember: (nickname: string) => ["searchPinbuddy", nickname],
};
