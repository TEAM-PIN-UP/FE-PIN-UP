import { B4 } from "@/style/font";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { requestState } from "..";

interface RequestButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: string;
  requestState: requestState;
}

interface ButtonProps {
  buttonColor: string;
}

const RequestButton: React.FC<RequestButtonProps> = ({
  icon,
  requestState,
  ...props
}) => {
  const [text, setText] = useState<string>();
  const [buttonColor, setButtonColor] = useState<string>("");
  useEffect(() => {
    if (requestState === "friend") {
      setText("");
      setButtonColor("var(--neutral_200)");
    } else if (requestState === "notFriend") {
      setText("핀버디 신청");
      setButtonColor("var(--neutral_800)");
    } else if (requestState === "pending") {
      setText("신청 완료");
      setButtonColor("var(--neutral_300)");
    }
  }, [requestState]);

  return (
    <StButton {...props} buttonColor={buttonColor}>
      <img src={icon} />
      <span>{text}</span>
    </StButton>
  );
};

const StButton = styled.button<ButtonProps>`
  ${B4}
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: var(--spacing_6);
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--radius_8);
  background-color: var(--neutral_100);
  padding: var(--spacing_12);
  box-sizing: content-box;
  height: 16px;
  cursor: pointer;
  transition: transform 0.02s ease-in-out, background-color 0.02s ease-in-out;

  &:active {
    background-color: var(--neutral_200);
    transform: scale(0.97);
  }
`;

export default RequestButton;
