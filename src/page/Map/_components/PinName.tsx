import React from "react";
import styled from "styled-components";

import { H6 } from "@/style/font";

interface PinNameProps {
  text: string;
}

const PinName: React.FC<PinNameProps> = ({ text }) => {
  return (
    <StDiv>
      <StSpan>{text.length > 3 ? `${text.slice(0, 3)}..` : text}</StSpan>
    </StDiv>
  );
};

const StDiv = styled.div`
  align-items: center;
  background-color: var(--neutral_800);
  border-radius: var(--radius_circle);
  justify-content: center;
  padding: 2.5px 7.5px;
`;

const StSpan = styled.span`
  ${H6}
  color: var(--white);
  letter-spacing: -0.126px;
`;

export default PinName;
