import styled from "styled-components";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import { H3 } from "@/style/font";

interface HeaderProp {
  stepDown: () => void;
}

const ReviewHeader: React.FC<HeaderProp> = ({ stepDown }) => {
  return (
    <StReviewHeader>
      <img src={chevronLeft} onClick={stepDown} />
      <p>리뷰 작성</p>
      <div />
    </StReviewHeader>
  );
};

const StReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--spacing_12) var(--spacing_16);
  box-sizing: border-box;
  border-bottom: 1px solid var(--neutral_100);
  ${H3}
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

export default ReviewHeader;
