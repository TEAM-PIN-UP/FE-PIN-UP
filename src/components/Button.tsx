import React, { useCallback, useEffect, useState } from "react";
import styled, { CSSProp } from "styled-components";

import { H3, H4, H5 } from "@/style/font";

interface buttonProps {
  size: "large" | "medium" | "small" | "xlarge";
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

interface styleProps {
  width: string;
  height: number;
  padding: string;
  active: boolean;
  typo: CSSProp;
}

const Button: React.FC<buttonProps> = ({ size, active, onClick, children }) => {
  const [width, setWidth] = useState<string>("max-content");
  const [height, setHeight] = useState<number>(40);
  const [padding, setPadding] = useState<string>("12px 16px");
  const [typo, setTypo] = useState<CSSProp>(H3);

  const buttonSizeCheckFunc = useCallback(() => {
    if (size === "small") {
      setWidth("max-content");
      setHeight(36);
      setPadding("10px 16px");
      setTypo(H5);
    } else if (size === "medium") {
      setWidth("max-content");
      setHeight(44);
      setPadding("14px 24px");
      setTypo(H5);
    } else if (size === "large") {
      setHeight(44);
      setPadding("13.5px 40px");
      setTypo(H4);
    } else if (size === "xlarge") {
      setWidth("calc( 100% - 40px )");
      setHeight(51);
      setPadding("16px 0px");
      setTypo(H3);
    }
  }, [size, setWidth, setHeight, setPadding, setTypo]);

  useEffect(() => {
    buttonSizeCheckFunc();
  }, [buttonSizeCheckFunc, size]);

  return (
    <StButton
      width={width}
      height={height}
      padding={padding}
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
  width: ${(props) => props.width};
  height: ${(props) => props.height}px;
  padding: ${(props) => props.padding};
  background-color: ${(props) =>
    props.active ? `var(--neutral_800)` : "var(--neutral_300)"};
  border-radius: var(--radius_circle);
  border: none;
  cursor: ${(props) => (props.active ? "pointer" : "default")};
  ${(props) => props.typo}
`;

export default Button;
