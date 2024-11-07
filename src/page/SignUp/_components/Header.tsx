import chevronLeft from "@/image/icons/chevronLeft.svg";
import React from "react";
import styled from "styled-components";

interface HeaderProps {
  onPrev: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ onPrev, title }) => {
  return (
    <HeaderContainer>
      <BackButton onClick={onPrev}>
        <img src={chevronLeft} />
      </BackButton>
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing_16) var(--spacing_12);
  border-bottom: 1px solid var(--neutral_100);
  background-color: var(--white);
`;

const BackButton = styled.button`
  display: flex;
  position: absolute;
  left: 0px;
  background: none;
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: var(--spacing_12);
`;

const Title = styled.h1`
  color: var(--neutral_800);
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

export default Header;
