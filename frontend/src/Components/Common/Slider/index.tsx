import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay } from 'swiper';
import { Typography } from '@mui/material';

interface IProps {
  items: string[];
  itemSx: object;
  slidersPerView: number;
  speed?: number;
}

const Slider: React.FC<IProps> = ({
  items,
  itemSx = {},
  slidersPerView = 1,
  speed = 2000,
}) => {
  return (
    <>
      <Swiper
        className="mySwiper"
        modules={[Autoplay]}
        effect="slide"
        loop
        speed={speed}
        slidesPerView={slidersPerView}
        simulateTouch={false}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          // when window width is >= 640px
          320: {
            slidesPerView: 1,
          },
          400: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 2,
          },
          600: {
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
          },
          832: {
            slidesPerView: slidersPerView,
          },
          1100: {
            slidesPerView: slidersPerView + 1,
          },
          1300: {
            slidesPerView: slidersPerView + 2,
          },
          1500: {
            slidesPerView: slidersPerView + 3,
          },
          1700: {
            slidesPerView: slidersPerView + 4,
          },
          1900: {
            slidesPerView: slidersPerView + 5,
          },
          2100: {
            slidesPerView: slidersPerView + 6,
          },
          2300: {
            slidesPerView: slidersPerView + 7,
          },
          2500: {
            slidesPerView: slidersPerView + 8,
          },
        }}
        style={{maxWidth: '100%'}}
      >
        {items.map((item: string, index: number) => (
          <SwiperSlide key={`item-${index}-${item}`}>
            <Typography sx={{ minWidth: 'max-content', ...itemSx }}>
              {item}
            </Typography>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
