import { useState } from "react";

import styled from "styled-components";
import ChooseLogin from "./_components/ChooseLogin";
import SetName from "./_components/SetName";
import SetProfile from "./_components/SetProfile";
import Tos from "./_components/Tos";
import TransitionWrapper, {
  TransitionDirection,
} from "./_components/TransitionWrapper";

const SignUpPage: React.FC = () => {
  const [stage, setStage] = useState(1);
  const lastStage = 4;
  const [direction, setDirection] = useState<TransitionDirection>("forward");

  const goNext = () => {
    setDirection("forward");
    setStage((s) => (s !== lastStage ? s + 1 : s));
  };

  const goPrev = () => {
    setDirection("backward");
    setStage((s) => (s > 1 ? s - 1 : s));
  };

  return (
    <StDiv>
      {stage > 1 && <button onClick={goPrev}>Back</button>}
      <TransitionWrapper key={stage} direction={direction}>
        {stage === 1 && <ChooseLogin onNext={goNext} onPrev={goPrev} />}
        {stage === 2 && <SetName onNext={goNext} onPrev={goPrev} />}
        {stage === 3 && <SetProfile onNext={goNext} onPrev={goPrev} />}
        {stage === 4 && <Tos onNext={goNext} onPrev={goPrev} />}
      </TransitionWrapper>
      <button onClick={() => goNext()}>다음</button>
    </StDiv>
  );
};

const StDiv = styled.div`
  flex: 1;
  padding: 20px;
`;

export default SignUpPage;
