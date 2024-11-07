import React from "react";
import { styled } from "styled-components";

const StTextContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return <StDiv {...props}>{children}</StDiv>;
};

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

export default StTextContainer;
