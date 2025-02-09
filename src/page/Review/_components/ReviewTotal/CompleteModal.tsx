import Button from "@/components/Button";
import styled from "styled-components";

interface CompleteModalProp {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompleteModal = ({ setModalOpen }: CompleteModalProp) => {
  return (
    <StCompleteModal>
      <div
        className="background"
        onClick={() => {
          setModalOpen(false);
        }}
      >
        <div className="modalContent">
          <div className="content">
            <p>등록한 리뷰를</p>
            <p>확인하시겠어요?</p>
          </div>
          <div className="buttonBox">
            <Button size="small" onClick={() => setModalOpen(false)}>
              아니요
            </Button>
            <Button size="small" onClick={() => setModalOpen(false)}>
              확인
            </Button>
          </div>
        </div>
      </div>
    </StCompleteModal>
  );
};

const StCompleteModal = styled.div`
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    .modalContent {
      display: flex;
      flex-direction: column;
      width: 272px;
      height: 189px;
      padding: 28px 20px 20px;
      box-sizing: border-box;
      border-radius: var(--radius_16);
      background-color: white;
      .content {
        display: flex;
      }
    }
  }
`;

export default CompleteModal;
