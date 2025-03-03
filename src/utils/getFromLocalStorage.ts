import { MemberResponse } from "@/page/SignUp/SignUpInterface";

export const getMemberResponseObj = () => {
  const memberResponseJson = localStorage.getItem("memberResponse");
  const memberResponse: MemberResponse | null = memberResponseJson
    ? (JSON.parse(memberResponseJson) as MemberResponse)
    : null;

  return memberResponse;
};

export const getLastKnownPositionObj = () => {
  const lastKnownPositionJson = localStorage.getItem("lastKnownPosition");
  const lastKnownPosition: GeolocationPosition | null = lastKnownPositionJson
    ? (JSON.parse(lastKnownPositionJson) as GeolocationPosition)
    : ({
        coords: {
          latitude: 37.5,
          longitude: 127.0,
          accuracy: 10,
        },
        timestamp: Date.now(),
      } as GeolocationPosition);

  return lastKnownPosition;
};
