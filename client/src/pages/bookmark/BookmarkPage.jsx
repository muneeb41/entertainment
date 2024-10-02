import React from 'react'
import SearchBar from '../../components/home/SearchBar'
import MovieBookmarks from '../../components/bookmarks/MovieBookmarks'
import TvShowBookmarks from '../../components/bookmarks/TvShowBookmarks'
import Footer from '../../components/common/Footer'
import { useSelector } from 'react-redux'

const BookmarkPage = () => {
  const {email} = useSelector(state=>state.user);
  return (
    <div>
        <SearchBar type={'movie'} text={'Millions of Movies and TV Shows'}/>
        {
          email?
          (
            <>
            {/* these are two components that show bookmarks of movie and tv Shows separately */}
            <MovieBookmarks/>     
            <TvShowBookmarks />
            </>
          ):
          (
            // this show only when user is not Authencate
            <div className='flex justify-center items-center'>
           <div>
             <div><p className='text-xl text-center font-bold  mx-auto py-5 dark:text-white lg:text-3xl  lg:pb-8 '>Bookmark Page Required Authentication</p></div>
             <div className='flex flex-row justify-center gap-4 sm:gap-8'>
              <a href="/login" className='bg-blue-500 rounded-lg box-shadow-main h-10 w-20 text-center pt-1 text-white font-bold sm:w-24'>Login</a>
              <a href="/signup" className='bg-blue-500 rounded-lg box-shadow-main h-10 w-20 text-center pt-1 text-white font-bold sm:w-24'>Sign up</a>
             </div>
           </div>
        </div>
          )
        }  
       
        <Footer/>
    </div>
  )
}

export default BookmarkPage