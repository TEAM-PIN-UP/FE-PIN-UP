import React from "react";
import styled from "styled-components";

const Header: React.FC<React.HTMLAttributes<HTMLDivElement>> & {
  Left: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Center: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Right: React.FC<React.HTMLAttributes<HTMLDivElement>>;
} = ({ children, ...props }) => {
  return <HeaderContainer {...props}>{children}</HeaderContainer>;
};

Header.Left = ({ children, ...props }) => {
  return (
    <div className="header-left" {...props}>
      {children}
    </div>
  );
};

Header.Center = ({ children, ...props }) => {
  return (
    <div className="header-center" {...props}>
      {children}
    </div>
  );
};

Header.Right = ({ children, ...props }) => {
  return (
    <div className="header-right" {...props}>
      {children}
    </div>
  );
};

const HeaderContainer = styled.div`
  position: absolute;
  width: 100%;
  max-width: 440px;
  height: 48px;
  top: 0px;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing_16) var(--spacing_12);
  border-bottom: 1px solid var(--neutral_100);
  box-sizing: border-box;
  background-color: var(--white);
  z-index: 20;

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
    top: var(--spacing_16);
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
    flex: 0;
  }
`;

export default Header;
