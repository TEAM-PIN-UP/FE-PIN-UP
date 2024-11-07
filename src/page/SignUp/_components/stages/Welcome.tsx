import Button from "@/components/Button";
import StGap from "../typography/StGap";
import StGlue from "../typography/StGlue";
import { StH1 } from "../typography/StText";
import StTextContainer from "../typography/StTextContainer";

const Welcome = () => {
  return (
    <>
      <StTextContainer>
        <StH1>환영합니다!</StH1>
        <StGap height="8px" />
        <StH1>아래 버튼을 눌러</StH1>
        <StGap height="8px" />
        <StH1>핀업을 시작하세요</StH1>
      </StTextContainer>
      <StGlue />
      <Button size="full" onClick={() => {}}>
        핀업 시작하기
      </Button>
    </>
  );
};

export default Welcome;
