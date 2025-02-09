import ImgWithPlaceholder from "@/components/ImgWithPlaceholder";
import { DateTimeTuple, PhotoReview, TextReview } from "@/interface/review";
import { H4 } from "@/style/font";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";
import ReviewText from "./ReviewText";

interface ReviewHistoryProps {
  index: number;
  onChangeIndex: (arg0: number) => void;
  photos: PhotoReview[];
  texts: TextReview[];
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

  const formatDate = (dateArray: DateTimeTuple): string => {
    const year = dateArray[0] % 100;
    const month = dateArray[1].toString().padStart(2, "0");
    const day = dateArray[2].toString().padStart(2, "0");

    return `${year}.${month}.${day}`;
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
                key={item.id}
                src={item.previewImageUrl}
                className="image"
                onClick={() => handleClick(item.id)}
              />
            ))}
        </div>
        <div className="text-reviews">
          {texts.map((item) => (
            <ReviewText
              key={item.id}
              placeName={""}
              longitude={0}
              latitude={0}
              userName="나"
              score={item.starRating.toString()}
              reviewDate={formatDate(item.createdAt)}
              body={item.content}
              visitDate={""}
            />
          ))}
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
