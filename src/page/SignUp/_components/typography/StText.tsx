import { B3, H1 } from "@/style/font";
import React from "react";
import { styled } from "styled-components";

export const StH1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => {
  return <_StH1 {...props}>{children}</_StH1>;
};

export const StB3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => {
  return <_StB3 {...props}>{children}</_StB3>;
};

const _StH1 = styled.h1`
  ${H1}
  margin: 0px;
`;

const _StB3 = styled.div`
  ${B3}
  color: var(--neutral_500);
`;
