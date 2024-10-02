import React, { useRef, useState,useCallback, useEffect } from "react";
import axios from "axios";
import MovieCart from "../common/MovieCart";
import TvShowCart from '../common/TvShowCart.jsx'

const SearchBar = ({type,text}) => {
  const queryRef = useRef();
  const [searchData, SetSearchData] = useState(null);
  const apiKey = 'db872527da4bcbbee43595ff4d4767a7';
  const debounceTimeoutRef = useRef(null);  // For debouncing
  const [banner,setBanner] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);


  // Fetch popular movies for the banner
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/${type}/popular?api_key=${apiKey}`);
        setBanner(response.data.results);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };
    fetchData();
  }, []);

  // Change banner image every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banner.length);
    }, 3000);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [banner]);



  const handleSearch = async (e) => {
    e.preventDefault();  // Prevents form from refreshing the page
    await handleSearching();  // Execute the search function
    queryRef.current.value = '';  // Clear the search input after the search
  };

  const handleSearching = async () => {
    const query = queryRef.current.value.trim();
    if (query === ""){
      SetSearchData(null)
      return
    };
    
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&query=${query}`
      );
      const dataWithImage = response.data.results.filter((item)=> item.poster_path !== null);
      SetSearchData(dataWithImage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const debounceSearch = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      handleSearching();
    }, 350);  //  the delay (300ms) 
  }, []);

  return (
    <div>
      <div
        className={`relative flex items-center justify-center h-80 z-10 bg-cover bg-center bg-no-repeat box-shadow-main transition-bg fade-in`}
        style={{ backgroundImage: `${banner.length==0?'url(/avengers.avif)'
          :`url(https://image.tmdb.org/t/p/w500/${banner[currentBannerIndex].poster_path})`}` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-xl sm:text-4xl md:text-5xl font-bold mb-6 animate-slide-from-up">
            {text}
          </h1>
          <form
            onSubmit={handleSearch}
            className="flex justify-center items-center space-x-4 flex-wrap gap-3 flex-col sm:flex-row"
          >
            <input
              id="search-input"
              type="text"
              placeholder={`Search your favorite ${type=='movie'?'Movie':'Tv Shows'}`}
              ref={queryRef}
              onChange={debounceSearch}
              className="w-[80vw] sm:w-96 md:w-96 lg:w-[40vw] px-4 py-2 rounded-full text-black dark:text-white dark:bg-gray-800 box-shadow-main animate-slide-from-left"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 animate-slide-from-right"
              aria-label="Search"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      {/* this result div only show when user searching something  */}
      {searchData && (
        <div>
          <div className="bg-white dark:bg-gray-700">
            <h2 className="text-xl font-bold ml-3 py-5 dark:text-white lg:text-3xl lg:ml-6 lg:pb-8">
              Search Results
            </h2>
            <div className="flex flex-row justify-center flex-wrap gap-2 ">
              {searchData.length == 0 && <p className='text-xl  font-bold  mx-auto py-5 dark:text-white lg:text-3xl  lg:pb-8'>No Result found.</p> }
              {
                 searchData.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="box-shadow-main rounded-xl bg-white dark:bg-gray-800 mx-3 mb-4  max-w-36 sm:max-w-40 lg:max-w-48 animate-slide-from-right"
                  >
                    {
                      type== "movie"?
                      (
                        <MovieCart movie={item} />
                      ):(
                        <TvShowCart tvShow={item} />
                      )
                    }
                    
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
