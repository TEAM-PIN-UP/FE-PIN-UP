import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/toastui-editor.css";
import styled from "styled-components";
import { B5, D1 } from "@/style/font";
import { useEffect, useRef, useState } from "react";
import { WriteReviewProp } from "./WriteReview";

const EditorCompo: React.FC<WriteReviewProp> = ({
  reviewContent,
  setReviewContent,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  const [charCount, setCharCount] = useState<number>(0);
  const maxChars = 10;
  const placeholder = `작성 된 리뷰는 나의 친구들에게만 보여요!\n
*주의: 욕설, 비방 목적 혹은 명예 훼손성 내용은 작성 시 삭제 처리 될 수 있습니다.`;

  useEffect(() => {
    if (reviewContent.length > maxChars && editorRef.current) {
      const truncatedContent = reviewContent.substring(0, maxChars);
      setReviewContent(truncatedContent);
      editorRef.current.getInstance().setMarkdown(truncatedContent);
    } else {
      setCharCount(reviewContent.length);
    }
  }, [reviewContent, setReviewContent]);

  const handleChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.getInstance().getMarkdown();
      setReviewContent(newContent);
    }
  };

  return (
    <StEditorCompo>
      <Editor
        ref={editorRef}
        initialValue={" "}
        previewStyle="vertical"
        height="151px"
        initialEditType="wysiwyg"
        placeholder={placeholder}
        useCommandShortcut={false}
        toolbarItems={[]}
        hideModeSwitch={true}
        onChange={handleChange}
      />
      <p className="countInfo">
        <span className="charCount">{charCount}</span>
        <span>/</span>
        <span>{maxChars}</span>
      </p>
    </StEditorCompo>
  );
};

const StEditorCompo = styled.div`
  width: 100%;
  height: 205px;
  background-color: var(--neutral_50);
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  ${D1}
  .countInfo {
    display: flex;
    gap: 2px;
    justify-content: right;
    ${B5}
    color : var(--neutral_300);
    .charCount {
      color: var(--neutral_800);
    }
  }
  .toastui-editor-contents {
    padding: 0px;
    border: none;
    background-color: transparent !important;
    ${D1}
  }
  .toastui-editor-defaultUI-toolbar {
    display: none !important; // Hides the toolbar entirely
  }
  .toastui-editor-toolbar {
    display: none;
  }
  .toastui-editor-main {
    margin-top: 0 !important; // Adjusts the editor layout after toolbar removal
    background-color: transparent !important; /* Makes editor background transparent */
  }
  .toastui-editor-defaultUI {
    border: none;
  }
  .toastui-editor-ww-container {
    background-color: transparent !important;
  }
`;

export default EditorCompo;
