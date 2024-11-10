import { H4 } from "@/style/font";
import styled from "styled-components";
import { useState } from "react";
import emptyStar from "@/image/icons/emptyStar.svg";
import fullStar from "@/image/icons/blackStar.svg";
import halfStar from "@/image/icons/halfBlackStar.svg";
import ScoreModal from "./ScoreModal";

interface CheckScoreProp {
  starScore: number;
  setStarScore: React.Dispatch<React.SetStateAction<number>>;
}

const CheckScore: React.FC<CheckScoreProp> = ({ starScore, setStarScore }) => {
  const [starModal, setStarModal] = useState<boolean>(false);

  const starShow = (score: number) => {
    const stars = [];
    let count = score;
    for (let i = 0; i < 5; i++) {
      if (count <= 0) {
        stars.push(<img src={emptyStar} alt="empty star" key={i} />);
      } else if (count >= 1) {
        stars.push(<img src={fullStar} alt="full star" key={i} />);
      } else if (count < 1 && count > 0) {
        stars.push(<img src={halfStar} alt="half star" key={i} />);
      }
      count--;
    }
    return stars;
  };

  return (
    <>
      {starModal ? (
        <ScoreModal
          starScore={starScore}
          setStarScore={setStarScore}
          setStarModal={setStarModal}
          starShow={starShow}
        />
      ) : (
        <></>
      )}
      <StCheckScore>
        <p className="title">별점</p>
        <div className="starBox" onClick={() => setStarModal(true)}>
          {starShow(starScore)}
        </div>
      </StCheckScore>
    </>
  );
};

const StCheckScore = styled.div`
  display: grid;
  gap: 12px;
  padding: 0 20px;
  .title {
    ${H4}
  }
  .starBox {
    display: flex;
    gap: 8px;
    width: min-content;
    cursor: pointer;
    img {
      width: 24px;
      height: 24px;
    }
  }
`;

export default CheckScore;
