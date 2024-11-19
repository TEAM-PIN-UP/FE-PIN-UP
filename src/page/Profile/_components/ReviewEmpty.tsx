import { H4 } from "@/style/font";
import React from "react";
import styled from "styled-components";

const ReviewEmpty: React.FC = () => {
  return (
    <StDiv>
      <span>아직 작성한 리뷰가 없어요!</span>
    </StDiv>
  );
};

const StDiv = styled.div`
  ${H4}
  position: relative;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 3px);
  height: 100%;
  text-align: center;
`;

export default ReviewEmpty;
