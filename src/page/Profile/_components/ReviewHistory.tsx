import React from "react";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";

import ImgWithPlaceholder from "@/components/ImgWithPlaceholder";
import { H4 } from "@/style/font";
import ReviewEmpty from "./ReviewEmpty";

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
        slideClassName="reviews-container"
        enableMouseEvents
        onMouseDown={(e) => e.preventDefault()}
        index={index}
        onChangeIndex={(i) => onChangeIndex(i)}
      >
        <div className={`image-reviews ${index === 0 ? "active" : ""}`}>
          {[...Array(24)].map((_, index) => (
            <ImgWithPlaceholder
              key={index}
              src={`https://picsum.photos/200?random=${index}`}
              className="image"
              onClick={() => console.log(index)}
            />
          ))}
        </div>
        <div className={`text-reviews ${index === 1 ? "active" : ""}`}>
          <ReviewEmpty />
        </div>
      </SwipeableViews>
    </StDiv>
  );
};

const StDiv = styled.div`
  ${H4}
  display: flex;
  flex: 1 0 auto;
  width: 100%;
  height: 100%;

  .react-swipeable-view-container {
    height: 100%;
  }

  .reviews-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;

    .image-reviews {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5px;
      width: 100%;
      height: 0px;
      overflow: hidden;

      .image {
        width: 100%;
        height: auto;
        aspect-ratio: 1;
        display: block;
        object-fit: cover;
      }

      &.active {
        flex: 1 0 auto;
        height: 100%;
        overflow-y: auto;
      }
    }

    .text-reviews {
      display: flex;
      flex-direction: column;
      flex: 1 0 auto;
      width: 100%;
      height: 0px;
      overflow: hidden;

      &.active {
        height: 100%;
        overflow-y: auto;
      }
    }
  }
`;

export default ReviewHistory;
