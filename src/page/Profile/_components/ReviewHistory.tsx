import React, { useRef, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";

import ImgWithPlaceholder from "@/components/ImgWithPlaceholder";
import { H4 } from "@/style/font";
import { useViewStore, view } from "../ProfileViewStore";
import ReviewText from "./ReviewText";

interface ReviewHistoryProps {
  index: number;
  onChangeIndex: (arg0: number) => void;
}

const ReviewHistory: React.FC<ReviewHistoryProps> = ({
  index,
  onChangeIndex,
}) => {
  const [isSwiping, setIsSwiping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Distinguish between swipe & click
  const handleSwitch = () => {
    setIsSwiping(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsSwiping(false);
    }, 50);
  };

  const { setCurrentView, setReviewId } = useViewStore();

  const handleClick = (index: number) => {
    if (isSwiping) return;
    setReviewId(index);
    setCurrentView(view.reviewDetailView);

    window.history.pushState(
      { view: "reviewDetail" },
      "",
      `/profile?photo-review=${index}`
    );
  };

  return (
    <StDiv>
      <SwipeableViews
        slideClassName="reviews-container"
        enableMouseEvents
        index={index}
        onChangeIndex={onChangeIndex}
        onMouseDown={(e) => e.preventDefault()}
        onSwitching={handleSwitch}
      >
        <div className={`image-reviews ${index === 0 ? "active" : ""}`}>
          {[...Array(24)].map((_, index) => (
            <ImgWithPlaceholder
              key={index}
              src={`https://picsum.photos/200?random=${index}`}
              className="image"
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
        <div className={`text-reviews ${index === 1 ? "active" : ""}`}>
          <ReviewText />
          <ReviewText />
          <ReviewText />
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
    width: calc(100vw - 3px);
    height: 100%;

    .image-reviews {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5px;
      height: 0px;
      overflow: hidden;

      .image {
        width: 100%;
        height: auto;
        aspect-ratio: 1;
        display: block;
        object-fit: cover;
        cursor: pointer;
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
      background-color: var(--neutral_100);
      gap: var(--spacing_8);

      &.active {
        height: 100%;
        overflow-y: auto;
      }
    }
  }
`;

export default ReviewHistory;
