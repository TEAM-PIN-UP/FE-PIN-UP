import getMemberResponseObj from "./getMemberResponseObj";

const checkLogin = (): boolean => {
  const memberResponse = getMemberResponseObj();
  const nickname = memberResponse?.nickname;
  const accessToken = localStorage.getItem("accessToken");

  // true if registered & signed in
  if (
    typeof nickname === "string" &&
    nickname.length > 0 &&
    typeof accessToken === "string" &&
    accessToken.length > 0
  )
    return true;
  return false;
};

export default checkLogin;
