import React from "react";
import styled from "styled-components";
import { SwiperSlide } from "swiper/react";

import BasicSwiper from "@/components/BasicSwiper";

interface ImageSwiperProps {
  defaultImgUrl: string;
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({ defaultImgUrl }) => {
  const images = [defaultImgUrl, ...Array(4).fill("/swiper_exampleimg.jpg")];

  return (
    <BasicSwiper spaceBetween={8} slidesPerView="auto" grabCursor={true}>
      {images.map((image, index) => (
        <StSwiperSlide key={index}>
          <StImage src={image} alt={`Slide ${index + 1}`} />
        </StSwiperSlide>
      ))}
    </BasicSwiper>
  );
};

const StSwiperSlide = styled(SwiperSlide)`
  width: 120px !important;
  height: 120px;
`;

const StImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius_8);
  opacity: 1;
`;

export default ImageSwiper;
