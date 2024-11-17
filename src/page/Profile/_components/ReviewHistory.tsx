import React from "react";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";

import { H4 } from "@/style/font";

interface ReviewHistoryProps {
  index: number;
  onChangeIndex: (arg0: number) => void;
}

const ReviewHistory: React.FC<ReviewHistoryProps> = ({
  index,
  onChangeIndex,
}) => {
  return (
    <StDiv>
      <SwipeableViews
        className="reviews-container"
        enableMouseEvents
        onMouseDown={(e) => e.preventDefault()}
        index={index}
        onChangeIndex={(i) => onChangeIndex(i)}
      >
        <div className="image-reviews">
          {[...Array(15)].map((_, index) => (
            <img
              key={index}
              src={`https://picsum.photos/200?random=${index}`}
              className="image"
              onClick={() => console.log(index)}
            />
          ))}
        </div>
        <div className="text-reviews">
          <span>아직 작성한 리뷰가 없어요!</span>
        </div>
      </SwipeableViews>
    </StDiv>
  );
};

const StDiv = styled.div`
  ${H4}
  display: flex;
  flex: 1 0 auto;

  .reviews-container {
    width: 100%;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: auto;

    .image-reviews {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5px;
      width: 100%;
      flex-grow: 1;

      .image {
        width: 100%;
        height: auto;
        aspect-ratio: 1;
        display: block;
        object-fit: cover;
      }
    }

    .text-reviews {
    }
  }
`;

export default ReviewHistory;
