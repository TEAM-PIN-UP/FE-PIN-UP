import getApi from "@/api/getApi";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { B5 } from "@/style/font";
import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import StTextContainer from "../typography/StTextContainer";
import { StageProps } from "./StageProps";

const lowerCharLimit = 2;
const upperCharLimit = 12;
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
    updateData({ nickname: value });
    // English and Korean letters + jamo
    const regex =
      /^[a-zA-Z\u1100-\u1112\u1161-\u1175\u3130-\u318F\uAC00-\uD7A3]*$/;
    setIsInputValid(
      value.length >= lowerCharLimit &&
        value.length <= upperCharLimit &&
        regex.test(value)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleNext();
  };

  const handleNext = async () => {
    try {
      setIsSubmitting(true);
      setIsNicknameValid(true);
      const response = await getApi.getMemberNicknameCheck(data.nickname);
      const isDuplicateNickname = response.data as boolean;

      if (isDuplicateNickname) {
        setIsNicknameValid(false);
      } else if (isInputValid) {
        setIsNicknameValid(true);
        onNext();
      }
    } catch (error) {
      console.error("Error checking nickname:", error);
      setIsNicknameValid(false);
      setIsSubmitting(false);
    }
  };

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
          maxLength={upperCharLimit}
          value={data.nickname}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ width: "100%", marginBottom: "6px" }}
          $onError={isSubmitting && !isNicknameValid}
        />
        <div className="char-limit">
          {!(isSubmitting && !isNicknameValid) && (
            <StB5 $isInvalid={!isInputValid}>
              2~12자의 한글, 영문만 입력 가능
            </StB5>
          )}
          {isSubmitting && !isNicknameValid && (
            <StB5
              $isInvalid={!isNicknameValid}
              style={{ color: "var(--system_error)" }}
            >
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
            {data.nickname.length} / {upperCharLimit}
          </StB5>
        </div>
      </div>

      <Button
        size="full"
        active={
          data.nickname.length !== 0 &&
          data.nickname.length <= upperCharLimit &&
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
  color: ${({ $isInvalid }) =>
    $isInvalid ? "var(--system_error)" : "var(--neutral_500)"};
  animation: ${({ $isInvalid }) =>
    $isInvalid
      ? css`
          ${shake} 0.25s
        `
      : "none"};
`;

export default SetName;
