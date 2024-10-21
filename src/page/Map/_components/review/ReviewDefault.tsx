import Button from "@/components/Button";
import { H3 } from "@/style/font";
import styled from "styled-components";

const ReviewDefault = () => {
  return (
    <StReviewDefault>
      <p>현재 리뷰가 없어요!</p>
      <Button
        size="small"
        active={true}
        onClick={() => console.log("리뷰작성 페이지로 가야함")}
      >
        리뷰 작성하러 가기
      </Button>
    </StReviewDefault>
  );
};

const StReviewDefault = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing_16);
  p {
    ${H3}
    color : var(--neutral_400);
    margin: 0;
  }
`;

export default ReviewDefault;
