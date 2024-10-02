
import React, { useState ,useEffect } from 'react';
import Loading from '../common/Loading';
import TrandingCart from './TrandingCart';
import axios from 'axios';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';


// import required modules
import {Autoplay,EffectCoverflow} from 'swiper/modules';

const Tranding = () => {
  const [tranding, setTranding] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false)


  useEffect(() => {
    const fetchMultiplePages = async () => {
      const apiKey = 'db872527da4bcbbee43595ff4d4767a7';
      const totalPages = 3; // Number of pages you want to fetch (e.g., 3 pages)
      
      // Create an array of promises for each page
      const requests = [];
      for (let page = 1; page <= totalPages; page++) {
        requests.push(axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${page}`));
      }

      try {
         setLoading(true);
        // Wait for all API requests to complete
        const responses = await Promise.all(requests);
        
        // Extract movie results from each response
        const allMovies = responses.flatMap(response => response.data.results);
        
        setTranding(allMovies);
      } catch (err) {
        console.log(err)
        setError(true)
      }finally{
        setLoading(false)
      }
    };

    fetchMultiplePages();
  }, []);
 

  if (loading) return <Loading/>
  if(error) return

  return (
    <div className='bg-white dark:bg-gray-700 animate-slide-from-left'>
      <h2 className='text-xl font-bold ml-3 py-5 dark:text-white lg:text-3xl lg:ml-6 '>Trending Movies</h2>
      <div className='flex flex-row gap-2 flex-wrap justify-center'>
        <Swiper
         autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
          slidesPerView={2}
          centeredSlides={true}
          effect={'coverflow'}
          grabCursor={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          modules={[Autoplay,EffectCoverflow]}
          className="mySwiper h-64 sm:h-96"
        >
        {tranding.map((movie,index) => (
          <SwiperSlide 
          key={`${movie.id}-${index}`} // Ensure unique keys
           className='box-shadow-main rounded-xl bg-white dark:bg-gray-800 '
          >
                   <TrandingCart  movie={movie} />
          </SwiperSlide>
        ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Tranding;
