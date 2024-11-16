import React from "react";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";

import { H4 } from "@/style/font";

const ReviewHistory: React.FC = () => {
  return (
    <StDiv>
      <SwipeableViews
        className="reviews-container"
        slideClassName="reviews"
        enableMouseEvents
        onMouseDown={(e) => e.preventDefault()}
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
        <div>
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
  margin-top: var(--spacing_16);

  .reviews-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .reviews {
      display: flex;
      flex: 1 0 auto;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .image-reviews {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5px;
        width: 100%;

        .image {
          width: 100%;
          height: auto;
          aspect-ratio: 1;
          display: block;
          object-fit: cover;
        }
      }
    }
  }
`;

export default ReviewHistory;
