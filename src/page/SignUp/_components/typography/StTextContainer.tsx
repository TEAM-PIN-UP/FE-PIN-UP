import { B1, B3, C1, H1 } from "@/style/font";
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

  .h1 {
    ${H1}
    margin-bottom: 8px;
  }
  .b1 {
    ${B1}
    margin-bottom: 8px;
  }
  .b3 {
    ${B3}
    margin-top: 4px;
  }
  .c1 {
    ${C1}
    color: var(--neutral_500);
  }
`;

export default StTextContainer;
