import Header from "@/components/Header";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import { H3 } from "@/style/font";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TransitionWrapper, {
  TransitionDirection,
} from "../../components/TransitionWrapper";
import SelectLogin from "./_components/stages/SelectLogin";
import SetName from "./_components/stages/SetName";
import SetProfile from "./_components/stages/SetProfile";
import Tos from "./_components/stages/Tos";
import Welcome from "./_components/stages/Welcome";
import { SignUpForm } from "./SignUpInterface";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const [stage, setStage] = useState(1);
  const lastStage = 5;
  const [direction, setDirection] = useState<TransitionDirection>("forward");

  const [signUpData, setSignUpData] = useState<SignUpForm>({
    authMethod: "",
    nickname: "",
    profileImage: "",
    agreedToTerms: [],
  });

  const goNext = () => {
    setDirection("forward");
    setStage((s) => {
      const nextStage = s !== lastStage ? s + 1 : s;
      window.history.pushState({}, "", `?stage=${nextStage}`);
      return nextStage;
    });
  };

  const goPrev = () => {
    setDirection("backward");
    setStage((s) => {
      const prevStage = s > 1 ? s - 1 : s;
      window.history.pushState({}, "", `?stage=${prevStage}`);
      return prevStage;
    });
  };

  const updateSignUpData = (newData: Partial<SignUpForm>) => {
    setSignUpData((prev) => ({ ...prev, ...newData }));
  };

  useEffect(() => {
    // Check if signed in
    const accessToken = localStorage.getItem("accessToken");
    const memberResponseJson = localStorage.getItem("memberResponse");
    const memberResponse = memberResponseJson
      ? JSON.parse(memberResponseJson)
      : null;
    if (accessToken && memberResponse.nickname) navigate("/map");

    // Use system back button for prev stage
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      goPrev();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return (
    <StDiv $stage={stage}>
      {stage !== 1 && (
        <Header>
          <Header.Left>
            <button className="back-button" onClick={goPrev}>
              <img src={chevronLeft} />
            </button>
          </Header.Left>
          <Header.Center>
            <span className="h3">회원가입</span>
          </Header.Center>
        </Header>
      )}
      <div className="content">
        <TransitionWrapper
          className="transition"
          key={stage}
          direction={direction}
        >
          {stage === 1 && (
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
            >
              <SelectLogin
                data={signUpData}
                updateData={(newData) => updateSignUpData(newData)}
                onNext={goNext}
              />
            </GoogleOAuthProvider>
          )}
          {stage === 2 && (
            <SetName
              data={signUpData}
              updateData={(newData) => updateSignUpData(newData)}
              onNext={goNext}
            />
          )}
          {stage === 3 && (
            <SetProfile
              data={signUpData}
              updateData={(newData) => updateSignUpData(newData)}
              onNext={goNext}
            />
          )}
          {stage === 4 && (
            <Tos
              data={signUpData}
              updateData={(newData) => updateSignUpData(newData)}
              onNext={goNext}
            />
          )}
          {stage === lastStage && <Welcome />}
        </TransitionWrapper>
      </div>
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
  padding-top: 48px;

  .h3 {
    ${H3}
  }

  .back-button {
    display: flex;
    position: absolute;
    left: 0px;
    background: none;
    border: none;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    padding: var(--spacing_12);
    box-sizing: content-box;
    width: 24px;
    height: 24px;
  }

  .content {
    display: flex;
    flex: 1;
    padding: var(--spacing_40) var(--spacing_20) var(--spacing_24)
      var(--spacing_20);
    box-sizing: border-box;
    width: 100%;
  }

  .transition {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;

export default SignUpPage;
