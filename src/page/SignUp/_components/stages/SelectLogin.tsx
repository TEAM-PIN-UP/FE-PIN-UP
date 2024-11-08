import { styled } from "styled-components";

import googleIcon from "../../_icons/googleIcon.png";
import kakaoIcon from "../../_icons/kakaoIcon.png";
import naverIcon from "../../_icons/naverIcon.svg";
import pinupLogo from "../../_icons/pinupLogo.svg";
import SocialSignUpButton from "../SocialSignUpButton";
import StTextContainer from "../typography/StTextContainer";
import { StageProps } from "./StageProps";

const SelectLogin: React.FC<StageProps> = ({ data, updateData, onNext }) => {
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
          onClick={() => {
            updateData({ authMethod: "google" });
            console.log(data);
            onNext();
          }}
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
