import Button from "@/components/Button";
import fullStar from "@/image/icons/blackStar.svg";
import emptyStar from "@/image/icons/emptyStar.svg";
import { B3, H2, H4 } from "@/style/font";
import { useState } from "react";
import styled from "styled-components";

interface ScoreModalProps {
  starScore: number;
  setStarScore: React.Dispatch<React.SetStateAction<number>>;
  setStarModal: React.Dispatch<React.SetStateAction<boolean>>;
  starShow: (score: number) => JSX.Element[];
}

const ScoreModal: React.FC<ScoreModalProps> = ({
  starScore,
  setStarScore,
  setStarModal,
  //   starShow,
}) => {
  //   const [starCountTemp, setStarCountTemp] = useState<number[]>(starCount);
  const [starScoreTemp, setStarScoreTemp] = useState<number>(starScore);

  const starShow = (score: number) => {
    const stars = [];
    let count = score;
    for (let i = 0; i < 5; i++) {
      if (count <= 0) {
        stars.push(
          <StarContainer>
            <img src={emptyStar} alt="empty star" key={i} />
            <div className="star" onClick={() => setStarScoreTemp(i + 1)} />
          </StarContainer>
        );
      } else if (count >= 1) {
        stars.push(
          <StarContainer>
            <img src={fullStar} alt="full star" key={i} />
            <div className="star" onClick={() => setStarScoreTemp(i + 1)} />
          </StarContainer>
        );
      }
      count--;
    }
    return stars;
  };

  return (
    <>
      <StScoreModal>
        <div
          className="background"
          onClick={() => {
            setStarModal(false);
            console.log("nn");
          }}
        />
        <div className="inBox">
          <div className="info">
            <p className="title">별점 남기기</p>
            <p className="question">식당 이용 경험은 어떠셨나요?</p>
          </div>
          <div className="starCheck">{starShow(starScoreTemp)}</div>
          <div className="buttonBox">
            <div
              className="cancelButton"
              onClick={() => {
                setStarModal(false);
              }}
            >
              취소
            </div>
            <Button
              size="large"
              onClick={() => {
                setStarScore(starScoreTemp);
                setStarModal(false);
              }}
              active={starScoreTemp > 0 ? true : false}
            >
              완료
            </Button>
          </div>
        </div>
      </StScoreModal>
    </>
  );
};

const StarContainer = styled.div`
  position: relative;
  .star {
    position: absolute;
    inset: 0px;
    width: 100%;
    height: 100%;
  }
  img {
    width: 28px;
    height: 28px;
  }
`;

const StScoreModal = styled.div`
  display: flex;
  flex-direction: column;
  .background {
    position: fixed;
    z-index: 99999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--transparent_50);
  }
  .inBox {
    position: fixed;
    z-index: 100000000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 276px;
    gap: 28px;
    padding: 28px 20px 20px;
    box-sizing: border-box;
    border-radius: 16px;
    background-color: var(--white);
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      .title {
        ${H2}
      }
      .question {
        ${B3}
        color: var(--neutral_500)
      }
    }
    .starCheck {
      display: flex;
      gap: 8px;
    }
  }
  .buttonBox {
    display: flex;
    align-items: center;
    gap: 12px;
    .cancelButton {
      ${H4}
      color : var(--neutral_500);
      padding: 16px 48px;
      cursor: pointer;
    }
  }
`;

export default ScoreModal;
