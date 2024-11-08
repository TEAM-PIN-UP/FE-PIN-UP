import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import StGlue from "../typography/StGlue";
import StTextContainer from "../typography/StTextContainer";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <>
      <StTextContainer>
        <div className="h1">환영합니다!</div>
        <div className="h1">아래 버튼을 눌러</div>
        <div className="h1">핀업을 시작해봐요</div>
      </StTextContainer>
      <StGlue />
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
