import Button from "@/components/Button";
import { MemberPatchBody, MemberPatchResponse } from "@/types/memberPatch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SignUpForm } from "../../SignUpInterface";
import StGlue from "../typography/StGlue";
import StTextContainer from "../typography/StTextContainer";

const Welcome = ({ data }: { data: SignUpForm }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
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

      console.log(formData);

      const response = await axios.patch<MemberPatchResponse>(
        `${import.meta.env.VITE_SERVER_ADDRESS}/api/members`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);

      // navigate("/map");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <StTextContainer>
        <div className="h1">환영합니다!</div>
        <div className="h1">아래 버튼을 눌러</div>
        <div className="h1">핀업을 시작해봐요</div>
      </StTextContainer>
      <StGlue />
      <Button size="full" onClick={handleClick}>
        핀업 시작하기
      </Button>
    </>
  );
};

export default Welcome;
