import React from 'react';
import styled from 'styled-components';
import BasicSwiper from '@/components/BasicSwiper';
import { SwiperSlide } from 'swiper/react';

const StyledSwiperSlide = styled(SwiperSlide)`
  width: 120px !important;
  height: 120px;
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius_12);
  opacity: 1;
`;

const ImageSwiper: React.FC = () => {
  const images = Array(5).fill('/swiper_exampleimg.jpg');

  return (
    <BasicSwiper
      spaceBetween={8}
      slidesPerView={5}
      grabCursor={true}
    >
      {images.map((image, index) => (
        <StyledSwiperSlide key={index}>
          <StyledImage 
            src={image} 
            alt={`Slide ${index + 1}`} 
          />
        </StyledSwiperSlide>
      ))}
    </BasicSwiper>
  );
};

export default ImageSwiper;