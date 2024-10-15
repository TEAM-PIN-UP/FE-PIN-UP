import React from 'react';
import styled from 'styled-components';
import BasicSwiper from '@/components/BasicSwiper';
import { SwiperSlide } from 'swiper/react';

interface ImageSwiperProps {
  defaultImgUrl: string;
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({defaultImgUrl}) => {
  const images = [
    defaultImgUrl,
    ...Array(4).fill('/swiper_exampleimg.jpg')
  ];

  return (
    <BasicSwiper
      spaceBetween={8}
      slidesPerView={3}
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

export default ImageSwiper;