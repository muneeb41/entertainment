import React, { useState } from 'react'
import CircleProgress from '../common/CircleProgress'
import { IoBookmarkOutline } from "react-icons/io5";
import serverApi from '../../api/serverApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaBookmark } from "react-icons/fa";


const TrandingCart = ({movie}) => {
    const {id ,poster_path,title,release_date,vote_average} = movie;
    const [isBookmark,setIsBookmark] = useState(false);
    const {email} = useSelector(state => state.user);
    const navigate = useNavigate()

    const handleAddBookmark = async ()=>{
      try {
          if(!email){
             toast.error('Bookmark required sign up or login');
              navigate('/signup')
            return 
          }
          movie.email = email
          setIsBookmark(true)
          const response = await serverApi.post('/movie/bookmark',movie);
          if(response.data.message != "Bookmark added successfully"){
            toast.error('there is error in server, please try again');
            setIsBookmark(false)
          }else{
            toast.success("Bookmark added successfully")
          }
      } catch (error) {
         console.log(error)
         toast.error('there is error in server, please try again');
         setIsBookmark(false)
      }
    }

    const handleRemoveBookmark = async ()=>{
      try {
        setIsBookmark(false)
        const response = await serverApi.delete('/movie/bookmark',{data:{email,id}});
        if(response.data.message == 'Bookmark removed successfully'){
          toast.success("Bookmark removed successfully")
        }else{
          toast.warn('Something wrong!')
          setIsBookmark(true)
        }
      } catch (error) {
        console.log(error)
        toast.warn('Something wrong!')
        setIsBookmark(true)
      }
    }

    const handleClick = (id) => {
      navigate(`/moviedetail/${id}`);
  };

  return (
    <div className='flex justify-center flex-col items-center relative  mb-10 '
    onClick={()=>handleClick(id)}
    >
        {/* image container */}
        <div>
            {isBookmark?(
                <FaBookmark className='relative top-6 left-16 text-white text-xl sm:text-3xl sm:top-8 sm:left-44 md:left-40 xl:left-56' 
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveBookmark();
                }}
                />
            ):(
              <IoBookmarkOutline className='relative top-6 left-16 text-white text-xl sm:text-3xl sm:top-8 sm:left-44 md:left-40 xl:left-56'
              onClick={(e) => {
                e.stopPropagation();
                handleAddBookmark();
              }}
             />
            )}
             
           
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt=""
             className='rounded-xl w-24 sm:h-64 sm:w-52 xl:w-64'
            />
            <CircleProgress  percentage={Math.floor(vote_average*10)}/>
        </div>
        {/* movie details */}
        <div className=' absolute  top-44 mt-2 sm:top-72'>
            <div className='text-md text-black font-bold dark:text-white ml-1 text-wrap text-center max-w-32 sm:text-xl '>{title}</div>
            <div className='ml-1 text-center dark:text-white'>{release_date}</div>
        </div>
    </div>
  )
}

export default TrandingCart