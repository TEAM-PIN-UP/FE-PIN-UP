import { H4 } from "@/style/font";
import React from "react";
import styled from "styled-components";

const ReviewEmpty: React.FC = () => {
  return <StDiv>아직 작성한 리뷰가 없어요!</StDiv>;
};

const StDiv = styled.div`
  ${H4}
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
`;

export default ReviewEmpty;
