import React from "react";
import styled from "styled-components";

interface HeaderProps {
  children: React.ReactNode;
}

interface HeaderSectionProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> & {
  Left: React.FC<HeaderSectionProps>;
  Center: React.FC<HeaderSectionProps>;
  Right: React.FC<HeaderSectionProps>;
} = ({ children }) => {
  return <HeaderContainer>{children}</HeaderContainer>;
};

Header.Left = ({ children }) => {
  return <div className="header-left">{children}</div>;
};

Header.Center = ({ children }) => {
  return <div className="header-center">{children}</div>;
};

Header.Right = ({ children }) => {
  return <div className="header-right">{children}</div>;
};

const HeaderContainer = styled.div`
  position: absolute;
  width: 100%;
  max-width: 440px;
  height: 48px;
  top: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing_16) var(--spacing_12);
  border-bottom: 1px solid var(--neutral_100);
  box-sizing: border-box;

  .header-left,
  .header-right {
    display: flex;
    flex: 0 1 auto;
    align-items: center;
    box-sizing: content-box;
    height: 24px;
    gap: var(--spacing_16);
  }

  .header-left {
    left: 0px;
  }
  .header-right {
    right: 0px;
  }
  .header-center {
    display: flex;
    position: absolute;
    top: var(--spacing_12);
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
    flex: 0;
  }
`;

export default Header;
