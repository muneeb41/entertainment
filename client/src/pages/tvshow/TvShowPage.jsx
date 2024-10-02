import React from 'react'
import SearchBar from '../../components/home/SearchBar'
import TopRatedTvShows from '../../components/tvshows/TopRatedTvShows'
import InfiniteScrolling from '../../components/common/InfiniteScrolling'

const TvShowPage = () => {
  return (
    <div>
        <SearchBar type={'tv'} text={'Search Your Favorite Tv Shows'}/>
        <TopRatedTvShows/>
         {/* InfiniteScrolling component load movie and tv show from tmdb when user touch bottom of Page.
        i use intersecting observer to track when user touch bottom of page then it load more movie and tv show */}
        <InfiniteScrolling type={'tv'} />
    </div>
  )
}

export default TvShowPage