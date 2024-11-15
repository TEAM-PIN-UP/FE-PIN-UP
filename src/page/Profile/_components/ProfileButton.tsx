import { B4 } from "@/style/font";
import React from "react";
import styled from "styled-components";

interface ProfileButtonProps {
  icon: string;
  text: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ icon, text }) => {
  return (
    <StButton>
      <img src={icon} />
      <span>{text}</span>
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
`;

export default ProfileButton;
