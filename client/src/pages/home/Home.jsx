import React from 'react'
import SearchBar from '../../components/home/SearchBar'
import Tranding from '../../components/home/Tranding'
import PopularMovies from '../../components/home/PopularMovies'
import PopularTvShows from '../../components/home/PopularTvShows'
import Footer from '../../components/common/Footer'

const Home = () => {
  return (
    // this is our home page 
    <div>
         {/* this SearchBar search any movie directly from tmdb api */}
        <SearchBar type={'movie'} text={'Millions of Movies and TV Shows'}/>  
        {/* this components are animated by swipper library */}
        <Tranding/>
        <PopularMovies/>
        <PopularTvShows/>
        <Footer/>
    </div>
  )
}

export default Home