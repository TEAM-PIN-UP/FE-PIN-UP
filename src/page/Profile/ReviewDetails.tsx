import Header from "@/components/Header";
import styled from "styled-components";

import chevronLeft from "@/image/icons/chevronLeft.svg";

export const ReviewDetails = () => {
  return (
    <StDiv>
      <Header>
        <Header.Left>
          <img src={chevronLeft} />
        </Header.Left>
        <Header.Center>리뷰 상세</Header.Center>
      </Header>
    </StDiv>
  );
};

const StDiv = styled.div``;
