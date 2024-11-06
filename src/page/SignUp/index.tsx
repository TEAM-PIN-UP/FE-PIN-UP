import { useEffect, useState } from "react";

import styled from "styled-components";
import Header from "./_components/Header";
import SelectLogin from "./_components/stages/SelectLogin";
import SetName from "./_components/stages/SetName";
import SetProfile from "./_components/stages/SetProfile";
import Tos from "./_components/stages/Tos";
import TransitionWrapper, {
  TransitionDirection,
} from "./_components/TransitionWrapper";
import { SignUpForm } from "./SignUpInterface";

const SignUpPage: React.FC = () => {
  const [stage, setStage] = useState(1);
  const lastStage = 4;
  const [direction, setDirection] = useState<TransitionDirection>("forward");

  const [signUpData, setSignUpData] = useState<SignUpForm>({
    loginMethod: "",
    name: "",
    profileImage: "",
    agreedToTerms: false,
  });

  const goNext = () => {
    setDirection("forward");
    setStage((s) => (s !== lastStage ? s + 1 : s));
  };

  const goPrev = () => {
    setDirection("backward");
    setStage((s) => (s > 1 ? s - 1 : s));
  };

  const updateSignUpData = (newData: Partial<SignUpForm>) => {
    setSignUpData((prev) => ({ ...prev, ...newData }));
  };

  useEffect(() => {
    // Use system back button for prev stage
    const handlePopState = () => {
      goPrev();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <StDiv $stage={stage}>
      {stage !== 1 && <Header title="회원가입" onPrev={goPrev} />}

      <StContent>
        <StTransitionWrapper key={stage} direction={direction}>
          {stage === 1 && (
            <SelectLogin
              data={signUpData}
              updateData={(newData) =>
                updateSignUpData({ loginMethod: newData.loginMethod })
              }
              onNext={goNext}
            />
          )}
          {stage === 2 && (
            <SetName
              data={signUpData}
              updateData={(newData) => updateSignUpData({ name: newData.name })}
              onNext={goNext}
            />
          )}
          {stage === 3 && (
            <SetProfile
              data={signUpData}
              updateData={(newData) =>
                updateSignUpData({ profileImage: newData.profileImage })
              }
              onNext={goNext}
            />
          )}
          {stage === 4 && (
            <Tos
              data={signUpData}
              updateData={(newData) =>
                updateSignUpData({ agreedToTerms: newData.agreedToTerms })
              }
              onNext={goNext}
            />
          )}
        </StTransitionWrapper>
      </StContent>
    </StDiv>
  );
};

const StDiv = styled.div<{ $stage: number }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  color: ${({ $stage }) => ($stage === 1 ? "var(--white)" : "var(--black)")};
  background-color: ${({ $stage }) =>
    $stage === 1 ? "var(--black)" : "var(--white)"};
  transition: background-color 0.5s ease, color 0.5s ease-in-out;
`;

const StContent = styled.div`
  display: flex;
  flex: 1;
  padding: var(--spacing_40) var(--spacing_20) var(--spacing_24)
    var(--spacing_20);
  box-sizing: border-box;
  width: 100%;
`;

const StTransitionWrapper = styled(TransitionWrapper)`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export default SignUpPage;
