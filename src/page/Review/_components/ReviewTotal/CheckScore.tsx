import { H4 } from "@/style/font";
import styled from "styled-components";
import { useState } from "react";
import emptyStar from "@/image/icons/emptyStar.svg";
import fullStar from "@/image/icons/blackStar.svg";
import halfStar from "@/image/icons/halfBlackStar.svg";
import ScoreModal from "./ScoreModal";

const CheckScore: React.FC = () => {
  const [starModal, setStarModal] = useState<boolean>(true);
  const [starCount, setStarCount] = useState<number[]>(
    Array.from({ length: 5 }, () => 0)
  );

  return (
    <>
      {starModal ? (
        <ScoreModal
          starCount={starCount}
          setStarCount={setStarCount}
          setStarModal={setStarModal}
        />
      ) : (
        <></>
      )}
      <StCheckScore>
        <p className="title">별점</p>
        <div className="starBox">
          {starCount.map((value, index) => {
            return (
              <div key={index} onClick={() => setStarModal(true)}>
                {value === 0 ? (
                  <img src={emptyStar} />
                ) : (
                  <img src={value === 1 ? fullStar : halfStar} />
                )}
              </div>
            );
          })}
        </div>
      </StCheckScore>
    </>
  );
};

const StCheckScore = styled.div`
  display: grid;
  gap: 12px;
  .title {
    ${H4}
  }
  .starBox {
    display: flex;
    gap: 8px;
    img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
`;

export default CheckScore;
