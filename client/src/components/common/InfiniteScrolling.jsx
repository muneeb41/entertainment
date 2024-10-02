import React, { useEffect, useRef, useState } from 'react'
import TvShowCart from './TvShowCart';
import axios from 'axios';
import MovieCart from './MovieCart';
import Loading from './Loading';

const InfiniteScrolling = ({type}) => {
    const [data, setData] = useState([]);
  const apiKey = 'db872527da4bcbbee43595ff4d4767a7';
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();

  // Fetch data when page number changes
  useEffect(() => {
    const fetchData = async () => {
      if (loading) return; // Prevent multiple fetches

      setLoading(true); // Set loading state
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${type === 'movie' ? 'movie' : 'tv'}/popular?api_key=${apiKey}&page=${page}`
        );

        if (response.data.results.length === 0) {
          setHasMore(false); // No more data
        } else {
          setData((prev) => [...prev, ...response.data.results]); // Append new data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    fetchData(); // Call the function
  }, [page]); // Add dependencies (page, loading)

  // Intersection observer for infinite scroll
  useEffect(() => {
    const lastElement = observerRef.current;

    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observerInstance = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });

    if (lastElement) {
      observerInstance.observe(lastElement);
    }

    return () => {
      if (lastElement) {
        observerInstance.unobserve(lastElement);
      }
    };
  }, [data]); // Dependencies

    
       
  return (
 /* InfiniteScrolling component load movie and tv show from tmdb when user touch bottom of Page.
        i use intersecting observer to track when user touch bottom of page then it load more movie and tv show */ 
    <div>
          <div className="bg-white dark:bg-gray-700" >
            <h2 className="text-xl font-bold ml-3 py-5 dark:text-white lg:text-3xl lg:ml-6 lg:pb-8">
               Explore {type=='movie'?'Movies':'Tv Shows'} To Infinite
            </h2>
            <div className="flex flex-row justify-center flex-wrap gap-2 ">
              {
                 data.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    ref={index==data.length-1?observerRef:null}
                    className="box-shadow-main rounded-xl bg-white dark:bg-gray-800 mx-3 mb-4  max-w-36 sm:max-w-40 lg:max-w-48"
                  >
                    {
                        type=='movie'?
                        (
                            <MovieCart movie={item} />
                        ):
                        (
                            <TvShowCart tvShow={item}/>
                        )
                    }  
                  </div>
                ))
              }
              {loading && <Loading  /> }
              {!hasMore && <div>there is no more data to fetch </div> }
            </div>
          </div>
        </div>
  )
}

export default InfiniteScrolling