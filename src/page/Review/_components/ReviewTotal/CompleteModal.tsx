import { B3, H2, H4 } from "@/style/font";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface CompleteModalProp {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  placeId: string;
}

const CompleteModal = ({ setModalOpen, placeId }: CompleteModalProp) => {
  const navigate = useNavigate();

  const moveToReview = () => {
    navigate(`/map?placeId=${placeId}`);
  };
  return (
    <StCompleteModal>
      <div
        className="background"
        onClick={() => {
          setModalOpen(false);
        }}
      >
        <div className="modalContent" onClick={(e) => e.stopPropagation()}>
          <div className="title">리뷰 작성 완료!</div>
          <div className="content">
            <p>등록한 리뷰를</p>
            <p>확인하시겠어요?</p>
          </div>
          <div className="buttonBox">
            <StButton type="no" onClick={() => navigate("/map")}>
              아니요
            </StButton>
            <StButton type="confirm" onClick={moveToReview}>
              확인
            </StButton>
          </div>
        </div>
      </div>
    </StCompleteModal>
  );
};

const StCompleteModal = styled.div`
  .background {
    position: fixed;
    z-index: 999999999999;
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
      .title {
        ${H2}
      }
      .content {
        display: flex;
        flex-direction: column;
        gap: 4px;
        ${B3}
        margin: 12px 0 24px;
        color: var(--neutral_500);
      }
      .buttonBox {
        display: flex;
      }
    }
  }
`;

const StButton = styled.button<{ type: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${H4}
  color: ${(props) =>
    props.type === "confirm" ? "var(--white)" : "var(--neutral_400)"};
  width: ${(props) => (props.type === "confirm" ? "104px" : "116px")};
  height: 45px;
  margin-left: ${(props) => (props.type === "confirm" ? "auto" : "")};
  box-sizing: border-box;
  background-color: ${(props) =>
    props.type === "confirm" ? "var(--neutral_800)" : "white"};
  border-radius: var(--radius_circle);
  border: none;
  cursor: pointer;
`;

export default CompleteModal;
