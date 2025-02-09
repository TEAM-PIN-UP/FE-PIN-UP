import { MemberResponse } from "@/page/SignUp/SignUpInterface";

const getMemberResponseObj = () => {
  const memberResponseJson = localStorage.getItem("memberResponse");
  const memberResponse: MemberResponse | null = memberResponseJson
    ? (JSON.parse(memberResponseJson) as MemberResponse)
    : null;

  return memberResponse;
};

export default getMemberResponseObj;
