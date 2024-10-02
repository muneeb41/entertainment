import React, { Component, useState } from 'react'
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import serverApi from '../../api/serverApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CircleProgress from './CircleProgress';

const TvShowCart = (props) => {
    
    const {tvShow} = props
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
          tvShow.email = email
          setIsBookmark(true)
          const response = await serverApi.post('/tv/bookmark',tvShow);
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
        if(tvShow._id){
          props.setTvShows((prev)=>{
            const newData = prev.filter((item)=> item._id !==tvShow._id);
            return newData;
          })
        }
        const id = tvShow.id;
        const response = await serverApi.delete('/tv/bookmark',{data:{email,id}});
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
      navigate(`/tvshowdetail/${id}`);
  };


    return (
        // this Component show tv series details that is used throughout the app
        <div
        key={tvShow.id}
        className="relative h-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg"
        onClick={()=>handleClick(tvShow.id)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
          alt={tvShow.original_name}
          className="w-full h-full rounded-t-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
        />
        {/* Bookmark Icon */}
        <div className="absolute top-2 right-2">
          {(isBookmark || tvShow._id) ? (
            <FaBookmark
              className="dark:text-white cursor-pointer text-white"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveBookmark();
              }}
            />
          ) : (
            <FaRegBookmark
              className="dark:text-white cursor-pointer text-white"
              onClick={(e) => {
                e.stopPropagation();
                handleAddBookmark();
              }}
            />
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-2">
          <h1 className="text-white text-lg font-semibold truncate">
            {tvShow.original_name}
          </h1>
          <p className="text-white text-sm mt-1 ">
            {new Date(tvShow.first_air_date).getFullYear()} •{" "}
            {tvShow.vote_average} • {tvShow.adult ? "18+" : "PG"}
          </p>
        </div>
        <div className="absolute hidden sm:flex sm:bottom-[-15px] sm:right-4">
    <CircleProgress percentage={Math.floor(tvShow.vote_average*10)}  />
    </div>
      </div>
      )
}

export default TvShowCart