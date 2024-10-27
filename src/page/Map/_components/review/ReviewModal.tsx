import styled from "styled-components";

import edit from "@/image/icons/edit.svg";
import trash from "@/image/icons/trash.svg";
import { B4 } from "@/style/font";

interface ReviewModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ setOpenModal }) => {
  return (
    <div>
      <StBack onClick={() => setOpenModal(false)} />
      <StReviewModal>
        <div className="button" onClick={() => setOpenModal(false)}>
          <img src={edit} alt="edit" />
          <span>수정하기</span>
        </div>
        <div className="midLine" />
        <div className="button" onClick={() => setOpenModal(false)}>
          <img src={trash} alt="trash" />
          <span>삭제하기</span>
        </div>
      </StReviewModal>
    </div>
  );
};

const StBack = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 1;
`;

const StReviewModal = styled.div`
  position: absolute;
  right: 0px;
  width: 111px;
  box-sizing: border-box;
  border: 1px solid var(--neutral_200);
  border-radius: var(--radius_12);
  padding: 0 var(--spacing_20);
  ${B4}
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.06);
  background-color: var(--white);
  z-index: 10;
  .button {
    display: flex;
    gap: var(--spacing_8);
    padding: var(--spacing_16) 0;
    cursor: pointer;
    img {
      width: 16px;
      height: 16px;
    }
  }
  .midLine {
    margin: 0 !important;
    background-color: var(--neutral_200);
  }
`;

export default ReviewModal;
