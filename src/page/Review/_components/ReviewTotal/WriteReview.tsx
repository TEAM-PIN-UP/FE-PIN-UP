import { H4 } from "@/style/font";
import styled from "styled-components";
import { Editor } from "@toast-ui/react-editor";

const WriteReview = () => {
  return (
    <StWriteReview>
      <p className="title">리뷰 작성하기</p>
      <Editor
        initialValue="hello"
        previewStyle="vertical"
        height="600px"
        // initialEditType="markdown"
        useCommandShortcut={true}
      />
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
