import styled from "styled-components";

import { H3 } from "@/style/font";
import ReviewDefault from "./ReviewDefault";
import ReviewSingle from "./ReviewSingle";

export interface reviewProps {
  profileImg: string;
  name: string;
  score: number;
  date: string;
  comment: string;
}

const Review: React.FC = () => {
  const dummy: reviewProps[] = [
    {
      profileImg: "aa",
      name: "강석우",
      score: 1.5,
      date: "2024-10-07",
      comment: "나쁘지 않음",
    },
    {
      profileImg: "aa",
      name: "김하연",
      score: 3,
      date: "2024-10-04",
      comment: "굿굿",
    },
    {
      profileImg: "aa",
      name: "이서윤",
      score: 2.5,
      date: "2024-10-02",
      comment: "다시 안갈듯",
    },
    {
      profileImg: "aa",
      name: "임하늘",
      score: 3.5,
      date: "2024-10-11",
      comment:
        "평범한 불고기의 맛, 공기밥이 차가웠음, 가게 직원들 불친절 한 사람 너무 많았음",
    },
  ];

  return (
    <StReview>
      <div className="reviewTitle">
        <span>리뷰</span>
        <span>{dummy.length}</span>
      </div>
      {dummy.length > 0 ? (
        dummy.map((value, index) => {
          return (
            <>
              <ReviewSingle
                key={index}
                name={value.name}
                score={value.score}
                profileImg={value.profileImg}
                date={value.date}
                comment={value.comment}
              />
              {index + 1 !== dummy.length ? <div className="midLine" /> : <></>}
            </>
          );
        })
      ) : (
        <ReviewDefault />
      )}
    </StReview>
  );
};

const StReview = styled.div`
  width: 100%;
  min-width: 320px;
  max-width: 440px;
  padding: var(--spacing_24) 0;
  .reviewTitle {
    display: flex;
    gap: 4px;
    padding: 0 var(--spacing_20);
    box-sizing: border-box;
    margin-bottom: 24px;
    ${H3}
  }
  .midLine {
    width: 100%;
    height: 1px;
    background-color: var(--neutral_50);
    margin: var(--spacing_16) 0;
  }
`;

export default Review;
