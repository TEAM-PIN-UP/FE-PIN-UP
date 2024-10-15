// Restaurant.tsx
import React from 'react';
import styled from 'styled-components';
import ImageSwiper from './ImageSwiper';

import { H3, H4, B4 } from "@/style/font";

interface RestaurantProps {
  name: string;
  averageRating: number;
  defaultImgUrl: string;
}

const Restaurant: React.FC<RestaurantProps> = ({name, averageRating, defaultImgUrl}) => {
  return (
    <Wrapper>
      <Container>
        <InfoContainer>
          <TextContainer>
            <Title>{name}</Title>
            <Rating>⭐ {averageRating.toFixed(1)}</Rating>
            <Detail>
              <Distance>2.4km</Distance>
              <ReviewNum>리뷰 4</ReviewNum>
            </Detail>
          </TextContainer>
          <Profile/>
        </InfoContainer>
        <ImageSwiper defaultImgUrl={defaultImgUrl}/>
      </Container>
      <Gap/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 23.4375rem;
  padding: var(--spacing_20);
  margin: 0 auto;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  padding-bottom: var(--spacing_16);
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing_6);
`

const Title = styled.div`
  ${H3};
  color: var(--neutral_800);
`;

const Rating = styled.div`
  ${H4};
  color: var(--neutral_800);
  text-align: center;
`;

const Detail = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`

const Distance = styled.span`
  ${B4};
  color: var(--neutral_500);
`;

const ReviewNum = styled.span`
  ${B4};
  color: var(--neutral_700);
`;

const Profile = styled.div`
  width: 1.625rem;
  height: 1.625rem;
  border-radius: var(--radius_circle);
  border: 1px solid var(--white);
  background: url(/pin_exampleimg.jpg) lightgray 50% / cover no-repeat;
`

const Gap = styled.div`
  height: 0.5rem;
  align-self: stretch;
  background: var(--neutral_50);
`

export default Restaurant;