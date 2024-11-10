import React from 'react';
import { Swiper, SwiperProps } from 'swiper/react';
import 'swiper/swiper.min.css';

interface BasicSwiperProps extends SwiperProps {
  children: React.ReactNode;
}

const BasicSwiper: React.FC<BasicSwiperProps> = ({ children, ...props }) => {
  return (
    <Swiper {...props}>
      {children}
    </Swiper>
  );
};

export default BasicSwiper;