import React from 'react'
import SearchBar from '../../components/home/SearchBar'
import TopRatedMovies from '../../components/movies/TopRatedMovies'
import InfiniteScrolling from '../../components/common/InfiniteScrolling'

const MoviePage = () => {
  return (
    <div>
        <SearchBar type={'movie'} text={'Search Your Favorite Movie'}/>
        <TopRatedMovies/>
        {/* InfiniteScrolling component load movie and tv show from tmdb when user touch bottom of Page.
        i use intersecting observer to track when user touch bottom of page then it load more movie and tv show */}
        <InfiniteScrolling type={'movie'}/>  
    </div>
  )
}

export default MoviePage