import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import StTextContainer from "../typography/StTextContainer";

const Welcome = () => {
  const navigate = useNavigate();
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
