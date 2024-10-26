// Restaurant.tsx
import React from "react";
import styled from "styled-components";

import { B4, H3, H4 } from "@/style/font";
import ImageSwiper from "./ImageSwiper";

export interface RestaurantProps {
  name: string;
  averageRating: number;
  defaultImgUrl: string;
}

const Restaurant: React.FC<RestaurantProps> = ({
  name,
  averageRating,
  defaultImgUrl,
}) => {
  return (
    <StWrapper>
      <StContainer>
        <StInfoContainer>
          <StTextContainer>
            <StTitle>{name}</StTitle>
            <StRating>⭐ {averageRating.toFixed(1)}</StRating>
            <StDetail>
              <StDistance>2.4km</StDistance>
              <StReviewNum>리뷰 4</StReviewNum>
            </StDetail>
          </StTextContainer>
          <StProfile />
        </StInfoContainer>
        <ImageSwiper defaultImgUrl={defaultImgUrl} />
      </StContainer>
      <StGap />
    </StWrapper>
  );
};

const StWrapper = styled.div`
  width: 100%;
`;

const StContainer = styled.div`
  padding: var(--spacing_20);
  margin: 0 auto;
`;

const StInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  padding-bottom: var(--spacing_16);
`;

const StTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing_6);
`;

const StTitle = styled.div`
  ${H3};
  color: var(--neutral_800);
`;

const StRating = styled.div`
  ${H4};
  color: var(--neutral_800);
  text-align: center;
`;

const StDetail = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

const StDistance = styled.span`
  ${B4};
  color: var(--neutral_500);
`;

const StReviewNum = styled.span`
  ${B4};
  color: var(--neutral_700);
`;

const StProfile = styled.div`
  width: 1.625rem;
  height: 1.625rem;
  border-radius: var(--radius_circle);
  border: 1px solid var(--white);
  background: url(/pin_exampleimg.jpg) lightgray 50% / cover no-repeat;
`;

const StGap = styled.div`
  height: 0.5rem;
  align-self: stretch;
  background: var(--neutral_50);
`;

export default Restaurant;
