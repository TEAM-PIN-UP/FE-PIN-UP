import { H4 } from "@/style/font";

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
`;

export default WriteReview;
