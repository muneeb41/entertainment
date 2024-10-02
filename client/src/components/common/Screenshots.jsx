import React from "react";
import { SwiperSlide } from "swiper/react";
import { Swiper } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

// import required modules
import {Autoplay ,Mousewheel} from 'swiper/modules';


const Screenshots = ({ screenshots }) => {
  return (
    <div className="bg-white dark:bg-gray-700 mt-5 animate-slide-from-right">
      
      <div>
      <Swiper
     slidesPerView={2} 
     autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      mousewheel={true}
        grabCursor={true}
        loop={true} // Enable loop only if there are enough slides
        spaceBetween={20}
        breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView:3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
     modules={[Autoplay,Mousewheel]}
     className="mySwiper"
     >
          {screenshots.map((item, index) => (
            <SwiperSlide
              key={`${item}-${index}`} // Ensure unique keys
              className="box-shadow-main rounded-xl bg-white dark:bg-red-700 md:mx-2"
            >
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/w500/${item.file_path}`}
                  alt={`Screenshot ${index + 1}`}
                   className="relative w-full h-full bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                />
                
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Screenshots;
