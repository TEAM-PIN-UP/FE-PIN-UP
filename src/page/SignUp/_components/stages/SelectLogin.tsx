import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { styled } from "styled-components";
import googleIcon from "../../_icons/googleIcon.png";
import kakaoIcon from "../../_icons/kakaoIcon.png";
import naverIcon from "../../_icons/naverIcon.svg";
import pinupLogo from "../../_icons/pinupLogo.svg";
import SocialSignUpButton from "../SocialSignUpButton";
import StTextContainer from "../typography/StTextContainer";
import { StageProps } from "./StageProps";

const SelectLogin: React.FC<StageProps> = ({ data, updateData, onNext }) => {
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    redirect_uri: "postmessage",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const tokens = await axios.get(
        `${import.meta.env.VITE_SERVER_ADDRESS}/api/auth/login/google/callback`,
        {
          params: {
            code: codeResponse.code,
          },
        }
      );

      console.log(tokens);
      onNext();
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const handleGoogle = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
		&redirect_uri=${import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI}
		&response_type=code
		&scope=email profile`;
  };

  return (
    <StDiv>
      <div className="logo-container">
        <StTextContainer style={{ alignItems: "center" }}>
          <div className="b1">서비스 보조 설명 문구</div>
          <img src={pinupLogo} />
        </StTextContainer>
      </div>

      <div className="button-container">
        <SocialSignUpButton
          icon={kakaoIcon}
          backgroundColor="#FAE300"
          onClick={() => {
            updateData({ authMethod: "kakao" });
            console.log(data);
            onNext();
          }}
        >
          카카오로 계속하기
        </SocialSignUpButton>
        <SocialSignUpButton
          icon={naverIcon}
          color="var(--white)"
          backgroundColor="#00C73C"
          onClick={() => {
            updateData({ authMethod: "naver" });
            console.log(data);
            onNext();
          }}
        >
          네이버로 계속하기
        </SocialSignUpButton>
        <SocialSignUpButton
          icon={googleIcon}
          backgroundColor="var(--white)"
          onClick={googleLogin}
        >
          구글로 계속하기
        </SocialSignUpButton>
      </div>
    </StDiv>
  );
};

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;

  .logo-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 17px;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--spacing_16);
    margin-bottom: 50px;
  }
`;

export default SelectLogin;
