import share from "@/image/icons/share.svg";
import { B4 } from "@/style/font";
import React from "react";
import styled from "styled-components";

const ShareButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => {
  return (
    <StButton {...props}>
      <img src={share} />
      <span>프로필 공유</span>
    </StButton>
  );
};

const StButton = styled.button`
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

export default ShareButton;
