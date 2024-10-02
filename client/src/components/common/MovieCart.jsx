import React, { useState } from 'react'
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import serverApi from '../../api/serverApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CircleProgress from './CircleProgress';

const MovieCart = (props) => {
  // this movie cart show movie details that is used throughout the website
   const {movie} = props
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
        if(movie._id){
          props.setMovies((prev)=>{
            const newData = prev.filter((item)=> item._id !==movie._id);
            return newData;
          })
        }
        const id = movie.id;
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
    <div
    key={movie.id}
    className="relative h-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg "
    onClick={()=>handleClick(movie.id)}
  >
    <img
      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
      alt={movie.title}
      className="w-full h-full rounded-t-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
    />
    {/* Bookmark Icon */}
    <div className="absolute top-2 right-2">
      {(isBookmark || movie._id) ? (
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
        {movie.title}
      </h1>
      <p className="text-white text-sm mt-1">
        {new Date(movie.release_date).getFullYear()} •{" "}
        {movie.vote_average} • {movie.adult ? "18+" : "PG"}
      </p>
    </div>
    <div className="absolute hidden sm:flex sm:bottom-[-15px] sm:right-4">
    <CircleProgress percentage={Math.floor(movie.vote_average*10)}  />
    </div>
  </div>
  )
}

export default MovieCart