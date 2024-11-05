import Button from "@/components/Button";
import { styled } from "styled-components";
import { StageProps } from "./StageProps";

const SelectLogin: React.FC<StageProps> = ({ data, updateData, onNext }) => {
  return (
    <StDiv>
      <StLogoContainer>
        <span>서비스 보조 설명 문구</span>
        <span>pinup</span>
      </StLogoContainer>

      <button onClick={() => updateData({ loginMethod: "kakao" })}>
        카카오로 계속하기
      </button>
      <button onClick={() => updateData({ loginMethod: "naver" })}>
        네이버로 계속하기
      </button>
      <button onClick={() => updateData({ loginMethod: "google" })}>
        구글로 계속하기
      </button>
      <Button
        size="large"
        active={true}
        onClick={() => {
          console.log(data);
          onNext();
        }}
      >
        다음
      </Button>
    </StDiv>
  );
};

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const StLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 17px;
`;

export default SelectLogin;
