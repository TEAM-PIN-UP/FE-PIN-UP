import ImgWithPlaceholder from "@/components/ImgWithPlaceholder";
import { paths } from "@/routes/paths";
import { H4 } from "@/style/font";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";

interface ProfileReviewProps {
  index: number;
  onChangeIndex: (arg0: number) => void;
}

const ProfileReview: React.FC<ProfileReviewProps> = ({
  index,
  onChangeIndex,
}) => {
  const navigate = useNavigate();

  const [isSwiping, setIsSwiping] = useState(false);
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsFriend(false);
  }, []);

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

    navigate(paths.profile.photoReview(index));
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
        {isFriend ? (
          <div>
            <p>게시물을 보려면 핀버디를</p>
            <p>신청하세요</p>
          </div>
        ) : (
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
        )}
        <div className="text-reviews">
          {/* <ReviewText />
          <ReviewText />
          <ReviewText /> */}
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

export default ProfileReview;
