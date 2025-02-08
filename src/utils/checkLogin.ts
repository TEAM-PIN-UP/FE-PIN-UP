import { MemberResponse } from "@/page/SignUp/SignUpInterface";

const checkLogin = (): boolean => {
  // Check memberResponse nickname field
  const memberResponseJson = localStorage.getItem("memberResponse");
  const memberResponse: MemberResponse | null = memberResponseJson
    ? (JSON.parse(memberResponseJson) as MemberResponse)
    : null;

  const nickname = memberResponse?.nickname;
  const accessToken = localStorage.getItem("accessToken");

  // true if registered & signed in
  if (nickname && nickname.length > 0 && accessToken) return true;
  return false;
};

export default checkLogin;
