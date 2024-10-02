import React from 'react'
import Loading from '../common/Loading.jsx';
import { GiCrossMark } from "react-icons/gi";
import CircleProgress from '../common/CircleProgress.jsx'
import Screenshots from '../common/Screenshots.jsx';

const MovieDetails = (props) => {
    const {movieDetails ,movieImages , trailerUrl, showTrailer ,setShowTrailer}  = props;

    if (!movieDetails)  return <Loading />
     

    const { runtime, status, genres, adult, homepage } = movieDetails;
  return (
    <div className="dark:bg-gray-700 dark:text-white p-6 min-h-screen flex flex-col items-center animate-slide-from-down">
    <div className="w-full bg-gray-100 dark:bg-gray-800 box-shadow-main max-w-[1000px] h-auto gap-8  grid md:grid-cols-2  sm:grid-cols-1 p-5 rounded-md shadow-sm dark:shadow-blue-100 shadow-black">
      <div className="flex justify-center items-center overflow-hidden rounded-xl  md:mb-0 mx-8 sm:mx-0 ">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="w-full h-auto object-contain box-shadow-main rounded-xl"
        />
      </div>
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-4 sm:text-4xl">{movieDetails.title}</h1>
        <h5 className="mb-5 dark:text-[#a9aebb] ">Synopsis:</h5>
        <p className="text-md  mb-4 sm:text-lg text-wrap ">{movieDetails.overview}</p>
        <p className="text-md mb-4">
          <strong className="dark:text-[#a9aebb]">Release Date:</strong> {new Date(movieDetails.release_date).toLocaleDateString()}
        </p>
        <div className="text-md  flex flex-row gap-2">
          <strong className="dark:text-[#a9aebb]">Rating:</strong>
          <div className='pt-4'>
           <CircleProgress percentage={Math.floor(movieDetails.vote_average*10)} />
          </div>
        </div>
        <p className="text-md mb-4">
          <strong className="dark:text-[#a9aebb]">Movie Length:</strong> {runtime} minutes
        </p>
        <p className="text-md mb-4">
          <strong className="dark:text-[#a9aebb]">Language:</strong> <span> {movieDetails.original_language}</span>
        </p>
        <p className="text-md mb-4">
          <strong className="dark:text-[#a9aebb]">Status:</strong> {status}
        </p>
        <p className="text-md mb-4">
          <strong className="dark:text-[#a9aebb]">Genre:</strong> {genres.map((genre) => genre.name).join(", ")}
        </p>
        <p className="text-md mb-4">
          <strong className="dark:text-[#a9aebb]">Adult Content:</strong> {adult ? "Yes" : "No"}
        </p>

        <div className="flex gap-4 mt-4 flex-wrap justify-center">
          {trailerUrl && (
            <button
              onClick={() => setShowTrailer(true)} // Show trailer on button click
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
            >
              Watch Trailer
            </button>
          )}
          {homepage && (
            <a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
            >
              Visit Website
            </a>
          )}
        </div>
      </div>
    </div>

    {movieImages.length < 6 && (
      <div className="w-full max-w-[1000px] mt-10">
        <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {movieImages.slice(0, 12).map((image, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
              alt={`Screenshot ${index + 1}`}
              className="w-full h-auto rounded-lg box-shadow-main"
            />
          ))}
        </div>
      </div>
    )}


    {showTrailer && trailerUrl && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
        <div className="relative bg-black p-4 rounded-md max-w-2xl w-full mx-8 box-shadow-main">
          <button
            onClick={() => setShowTrailer(false)}
            className="absolute top-[-10px] right-[-10px]  text-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            <GiCrossMark className='text-4xl hover:text-red-500 hover-scale' />
          </button>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              width="100%"
              height="315"
              src={trailerUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default MovieDetails