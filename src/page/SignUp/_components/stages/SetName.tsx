import getApi from "@/api/getApi";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { B5 } from "@/style/font";
import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import StTextContainer from "../typography/StTextContainer";
import { StageProps } from "./StageProps";

const charLimit = 12;
const shake = keyframes`
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  `;

const SetName: React.FC<StageProps> = ({ data, updateData, onNext }) => {
  // User input validity, nickname duplicate check result
  const [isInputValid, setIsInputValid] = useState(true);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    const value = e.target.value;
    if (value.length <= charLimit) {
      updateData({ nickname: value });

      // English and Korean letters + jamo
      const regex =
        /^[a-zA-Z\u1100-\u1112\u1161-\u1175\u3130-\u318F\uAC00-\uD7A3]*$/;
      setIsInputValid(regex.test(value));
    } else {
      setIsInputValid(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleNext();
  };

  const handleNext = async () => {
    try {
      setIsSubmitting(true);
      const response = await getApi.getMemberNicknameCheck({
        nickname: data.nickname,
      });
      setIsNicknameValid(!(response.data as boolean));
    } catch (error) {
      console.error("Error checking nickname:", error);
      setIsNicknameValid(false);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSubmitting && isInputValid && isNicknameValid) onNext();
    return () => {};
  }, [isInputValid, isNicknameValid, isSubmitting, onNext]);

  return (
    <StDiv>
      <StTextContainer>
        <div className="h1">반가워요!</div>
        <div className="h1">닉네임을 만들어볼까요?</div>
        <div className="b3 color-gray">
          닉네임은 나중에 언제든지 변경가능해요.
        </div>
      </StTextContainer>

      <div className="input-container">
        <TextInput
          placeholder="닉네임 입력"
          maxLength={charLimit}
          value={data.nickname}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ width: "100%", marginBottom: "6px" }}
          $onError={isSubmitting && !isNicknameValid}
        />
        <div className="char-limit">
          {!(isSubmitting && !isNicknameValid) && (
            <StB5 $isInvalid={!isInputValid}>한글, 영문만 입력 가능</StB5>
          )}
          {isSubmitting && !isNicknameValid && (
            <StB5 style={{ color: "var(--system_error)" }}>
              중복되는 닉네임이에요.
            </StB5>
          )}
          <StB5
            style={{
              color:
                isSubmitting && !isNicknameValid
                  ? "var(--system_error)"
                  : "var(--neutral_500)",
            }}
          >
            {data.nickname.length} / {charLimit}
          </StB5>
        </div>
      </div>

      <Button
        size="full"
        active={
          data.nickname.length !== 0 &&
          data.nickname.length <= charLimit &&
          isInputValid
        }
        onClick={handleNext}
      >
        다음
      </Button>
    </StDiv>
  );
};

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  .input-container {
    display: flex;
    flex-direction: column;
    text-align: start;
    width: 100%;
    padding-top: 24px;
    padding-bottom: 20px;

    .char-limit {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 var(--spacing_8);
    }
  }

  .color-gray {
    color: var(--neutral_500);
  }
`;

const StB5 = styled.div<{ $isInvalid?: boolean }>`
  ${B5}
  color: ${({ $isInvalid }) => ($isInvalid ? "red" : "var(--neutral_500)")};
  animation: ${({ $isInvalid }) =>
    $isInvalid
      ? css`
          ${shake} 0.25s
        `
      : "none"};
`;

export default SetName;
