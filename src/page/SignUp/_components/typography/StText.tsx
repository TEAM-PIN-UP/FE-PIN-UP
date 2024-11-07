import { B1, B3, C1, H1 } from "@/style/font";
import React from "react";
import { styled } from "styled-components";

export const StH1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => {
  return <_StH1 {...props}>{children}</_StH1>;
};

export const StB1: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return <_StB1 {...props}>{children}</_StB1>;
};

export const StB3: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return <_StB3 {...props}>{children}</_StB3>;
};

export const StC1: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return <_StC1 {...props}>{children}</_StC1>;
};

const _StH1 = styled.h1`
  margin: 0px;
  ${H1}
`;

const _StB1 = styled.div`
  ${B1}
`;

const _StB3 = styled.div`
  ${B3}
`;

const _StC1 = styled.div`
  ${C1}
  color: var(--neutral_500);
`;
