import Button from "@/components/Button";
import { MemberPatchBody } from "@/interface/member";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MemberResponse, SignUpForm } from "../../SignUpInterface";
import StTextContainer from "../typography/StTextContainer";

const Welcome = ({ data }: { data: SignUpForm }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found.");

      const request: MemberPatchBody["request"] = {
        nickname: data.nickname,
        termsOfMarketing: data.agreedToTerms.includes("TOM") ? "Y" : "N",
      };
      const profileImageBlob = await (await fetch(data.profileImage)).blob();
      const mimeType = data.profileImage.split(";")[0].split(":")[1];
      const fileExtension = mimeType === "image/png" ? "png" : "jpg";

      const formData = new FormData();
      formData.append("request", JSON.stringify(request));
      formData.append(
        "multipartFile",
        profileImageBlob,
        `profile.${fileExtension}`
      );

      await axios.patch(
        `${import.meta.env.VITE_SERVER_ADDRESS}/api/members`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update local storage member response
      const memberResponseJson = localStorage.getItem("memberResponse");
      const memberResponse: MemberResponse | null = memberResponseJson
        ? (JSON.parse(memberResponseJson) as MemberResponse)
        : null;
      if (memberResponse) {
        memberResponse.nickname = data.nickname;
        localStorage.setItem("memberResponse", JSON.stringify(memberResponse));
      } else {
        navigate("/signup");
      }
      navigate("/map");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <StTextContainer
        style={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="h1">반가워요!</div>
        <div className="h1">이제 ‘찐’ 맛집 리뷰를 탐색해볼까요?</div>
      </StTextContainer>
      <Button
        size="full"
        onClick={() => {
          navigate("/map");
        }}
      >
        핀업 시작하기
      </Button>
    </>
  );
};

export default Welcome;
