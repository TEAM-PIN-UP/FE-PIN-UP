import ImgWithPlaceholder from "@/components/ImgWithPlaceholder";
import { Review } from "@/interface/review";
import { H4 } from "@/style/font";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";
import ReviewText from "./ReviewText";

interface ReviewHistoryProps {
  index: number;
  onChangeIndex: (arg0: number) => void;
  photos: Review[];
  texts: Review[];
}

const ReviewHistory: React.FC<ReviewHistoryProps> = ({
  index,
  onChangeIndex,
  photos,
  texts,
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

  const formatDate = (date: string): string => {
    const [year, month, day] = date.split("-");
    return `${year.slice(2)}.${month}.${day}`;
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
        style={{ width: "100%" }}
      >
        <div className="image-reviews">
          {Array.isArray(photos) &&
            photos.map((item) => (
              <ImgWithPlaceholder
                key={item.reviewId}
                src={item.reviewImageUrls[0]}
                className="image"
                onClick={() => handleClick(item.reviewId)}
              />
            ))}
        </div>
        <div className="text-reviews">
          {texts.map((item) => (
            <ReviewText
              key={item.reviewId}
              id={item.reviewId}
              placeName={item.placeName}
              userName="나"
              score={item.starRating.toString()}
              reviewDate={formatDate(item.createdAt)}
              body={item.content}
              visitDate={formatDate(item.visitedDate)}
            />
          ))}
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
