import { H4, H5 } from "@/style/font";

import styled from "styled-components";
import EditorCompo from "./EditorCompo";

export interface WriteReviewProp {
  reviewContent: string;
  setReviewContent: React.Dispatch<React.SetStateAction<string>>;
}

const WriteReview: React.FC<WriteReviewProp> = ({
  reviewContent,
  setReviewContent,
}) => {
  return (
    <StWriteReview>
      <p className="title">리뷰 작성하기</p>
      <EditorCompo
        reviewContent={reviewContent}
        setReviewContent={setReviewContent}
      />
      <p className="info">10자 이상 작성해 주세요.</p>
    </StWriteReview>
  );
};

const StWriteReview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px;
  .title {
    ${H4}
  }
  .info {
    ${H5}
    color: var(--neutral_400);
    margin-bottom: var(--spacing_12);
  }
`;

export default WriteReview;
