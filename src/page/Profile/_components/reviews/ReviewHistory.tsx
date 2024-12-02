import React, { useRef, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";

import ImgWithPlaceholder from "@/components/ImgWithPlaceholder";
import { H4 } from "@/style/font";
import { useNavigate } from "react-router-dom";
import ReviewText from "./ReviewText";

interface ReviewHistoryProps {
  index: number;
  onChangeIndex: (arg0: number) => void;
}

const ReviewHistory: React.FC<ReviewHistoryProps> = ({
  index,
  onChangeIndex,
}) => {
  const navigate = useNavigate();

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

  const handleClick = (index: number) => {
    if (isSwiping) return;

    navigate(`photo-review/${index}`);
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
        <div className="image-reviews">
          {[...Array(24)].map((_, index) => (
            <ImgWithPlaceholder
              key={index}
              src={`https://picsum.photos/200?random=${index}`}
              className="image"
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
        <div className="text-reviews">
          <ReviewText
            placeName="잠실새내 딤딤섬"
            longitude={127.104809}
            latitude={37.5144}
            userName="나"
            score="4.0"
            reviewDate="24.10.17"
            body="새우 들어간 딤섬이 젤 마싯음 !! 매장도 깔끔"
            visitDate="2024년 10월 31일"
          />
          <ReviewText
            placeName="잠실새내 딤딤섬"
            longitude={127.104809}
            latitude={37.5144}
            userName="나"
            score="4.0"
            reviewDate="24.10.17"
            body="새우 들어간 딤섬이 젤 마싯음 !! 매장도 깔끔"
            visitDate="2024년 10월 31일"
          />
          <ReviewText
            placeName="잠실새내 딤딤섬"
            longitude={127.104809}
            latitude={37.5144}
            userName="나"
            score="4.0"
            reviewDate="24.10.17"
            body="새우 들어간 딤섬이 젤 마싯음 !! 매장도 깔끔"
            visitDate="2024년 10월 31일"
          />
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
      flex: 1 0 auto;
      height: 100%;
      overflow-y: auto;

      .image {
        width: 100%;
        height: auto;
        aspect-ratio: 1;
        display: block;
        object-fit: cover;
        cursor: pointer;
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
      height: 100%;
      overflow-y: auto;
    }
  }
`;

export default ReviewHistory;
