import Header from "@/components/Header";
import chevronLeft from "@/images/icons/chevronLeft.svg";
import { H3 } from "@/styles/font";
import styled from "styled-components";

interface HeaderProp {
  step: number;
  stepDown: () => void;
}

const ReviewHeader: React.FC<HeaderProp> = ({ step, stepDown }) => {
  return (
    <StReviewHeader>
      <Header.Left>
        {step !== 1 && <img src={chevronLeft} onClick={stepDown} />}
      </Header.Left>
      <Header.Center>핀로그 작성</Header.Center>
    </StReviewHeader>
  );
};

const StReviewHeader = styled(Header)`
  ${H3}
  img {
    cursor: pointer;
  }
`;

export default ReviewHeader;
