import { H4 } from "@/style/font";
import styled from "styled-components";

const WriteReview = () => {
  return (
    <StWriteReview>
      <p className="title">리뷰 작성하기</p>
    </StWriteReview>
  );
};

const StWriteReview = styled.div`
  display: grid;
  gap: 12px;
  .title {
    ${H4}
  }
`;

export default WriteReview;
