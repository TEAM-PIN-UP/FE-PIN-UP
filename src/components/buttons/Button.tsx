import React, { useEffect, useState } from "react";
import styled, { CSSProp } from "styled-components";

import { H3, H4, H5 } from "@/style/font";

interface buttonProps {
  size: "large" | "medium" | "small";
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

interface styleProps {
  width: number;
  height: number;
  active: boolean;
  typo: CSSProp;
}

const Button: React.FC<buttonProps> = ({ size, active, onClick, children }) => {
  const [width, setWidth] = useState<number>(72);
  const [height, setHeight] = useState<number>(40);
  const [typo, setTypo] = useState<CSSProp>(H3);

  const buttonSizeCheckFunc = () => {
    if (size === "small") {
      setWidth(72);
      setHeight(40);
      setTypo(H5);
    } else if (size === "medium") {
      setWidth(120);
      setHeight(49);
      setTypo(H4);
    } else if (size === "large") {
      setWidth(335);
      setHeight(51);
      setTypo(H3);
    }
  };

  useEffect(() => {
    buttonSizeCheckFunc();
  }, [size]);

  return (
    <StButton
      width={width}
      height={height}
      active={active}
      typo={typo}
      onClick={onClick}
      disabled={!active}
    >
      {children}
    </StButton>
  );
};

const StButton = styled.button<styleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: ${(props) =>
    props.active ? `var(--neutral_800)` : "var(--neutral_300)"};
  border-radius: var(--radius_circle);
  cursor: ${(props) => (props.active ? "pointer" : "default")};
  ${(props) => props.typo}
`;

export default Button;
