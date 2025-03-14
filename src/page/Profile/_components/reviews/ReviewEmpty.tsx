import receipt from "@/image/icons/receiptLines.svg";
import { H4 } from "@/style/font";
import React from "react";
import styled from "styled-components";

const ReviewEmpty: React.FC = () => {
  return (
    <StDiv>
      <img src={receipt} />
      <span>아직 작성하신 리뷰가 없어요!</span>
    </StDiv>
  );
};

const StDiv = styled.div`
  ${H4}
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  gap: var(--spacing_16);
  width: calc(var(--max_width)-2px);
  height: 100%;
  text-align: center;
  background-color: var(--white);
`;

export default ReviewEmpty;
