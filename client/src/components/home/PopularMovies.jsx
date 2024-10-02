import React, { useEffect, useState } from 'react'
import SwiperWraper from '../common/SwiperWraper'
import { SwiperSlide } from 'swiper/react'
import axios from 'axios'
import Loading from '../common/Loading'
import MovieCart from '../common/MovieCart'

const PopularMovies = () => {
    const [movies,setMovies] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false)

    
  useEffect(() => {
    const fetchMultiplePages = async () => {
      const apiKey = 'db872527da4bcbbee43595ff4d4767a7';
      const totalPages = 2; // Number of pages you want to fetch (e.g., 2 pages)
      
      // Create an array of promises for each page
      const requests = [];
      for (let page = 1; page <= totalPages; page++) {
        requests.push(axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`));
      }

      try {
         setLoading(true);
        // Wait for all API requests to complete
        const responses = await Promise.all(requests);
        
        // Extract movie results from each response
        const allMovies = responses.flatMap(response => response.data.results);
        
        setMovies(allMovies);
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
    <div className='bg-white dark:bg-gray-700'>
        <h2 className='text-xl font-bold ml-3 py-5 dark:text-white lg:text-3xl lg:ml-6 lg:pb-8 '>Popular Movies</h2>
         <div>
              <SwiperWraper>
                  {
                    movies.map((movie,index)=>(
                        <SwiperSlide 
                        key={`${movie.id}-${index}`} // Ensure unique keys
                         className='box-shadow-main rounded-xl bg-white dark:bg-gray-800 md:mx-2'
                        >
                                 <MovieCart  movie={movie} />
                        </SwiperSlide>
                    ))
                  }
              </SwiperWraper>
         </div>
    </div>
  )
}

export default PopularMovies