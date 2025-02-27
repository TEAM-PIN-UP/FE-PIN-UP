import { B5, H1, H3 } from "@/style/font";
import styled from "styled-components";
import GraphBar from "./GraphBar";

interface ReviewGraphProps {
  reviewCount: number;
  averageStarRating: number;
  ratingGraph: Map<string, number>;
}

const ReviewGraph: React.FC<ReviewGraphProps> = ({
  reviewCount,
  averageStarRating,
  ratingGraph,
}) => {
  const ratingGraphMap = new Map(
    Object.entries(ratingGraph).map(([key, value]) => [Number(key), value])
  );
  let sum = 0;
  const array = [];
  for (let i = 1; i <= 5; i++) {
    if (ratingGraphMap.has(i)) {
      sum += ratingGraphMap.get(i);
    }
  }
  for (let i = 5; i >= 1; i--) {
    array.push(ratingGraphMap.get(i) / sum);
  }

  return (
    <StReviewGraph>
      <div className="contents">
        <div className="scoreBox">
          <p className="scoreTable">
            <span className="realScore">{averageStarRating}</span>
            <span className="slash">/</span>
            <span>5</span>
          </p>
          <p className="countTable">
            <span className="count">{reviewCount}</span>
            <span>명의 후기</span>
          </p>
        </div>
        <div className="graphBox">
          {array.map((val, idx) => (
            <div className="graphSingle" key={idx}>
              <GraphBar percentage={val} />
              <p>{5 - idx}</p>
            </div>
          ))}
        </div>
      </div>
    </StReviewGraph>
  );
};

const StReviewGraph = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  .contents {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 104px;
    background-color: var(--neutral_50);
    border-radius: 8px;
    padding: 12px 0;
    box-sizing: border-box;
    .scoreBox {
      display: flex;
      flex-direction: column;
      gap: 6px;
      .scoreTable {
        display: flex;
        align-items: center;
        ${H3}
        color : var(--neutral_400);
        .realScore {
          ${H1}
          color : black
        }
        .slash {
          margin: 0 4px 0 7px;
        }
      }
      .countTable {
        display: flex;
        justify-content: center;
        ${B5}
        color : var(--neutral_400);
        .count {
          color: black;
        }
      }
    }
    .graphBox {
      display: flex;
      gap: 6px;
      margin-left: 56px;
      .graphSingle {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        width: 13px;
        font-size: 10px;
        font-family: "PretendardMedium";
      }
    }
  }
`;

export default ReviewGraph;
