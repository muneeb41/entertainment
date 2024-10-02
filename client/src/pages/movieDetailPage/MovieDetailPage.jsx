import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/common/Loading";
import MovieDetails from "../../components/movieDetails/MovieDetails.jsx";
import Screenshots from "../../components/common/Screenshots.jsx";

const MovieDetailPage = () => {
  const { id } = useParams();
  const apiKey = "db872527da4bcbbee43595ff4d4767a7";
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieImages, setMovieImages] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false); // State to control trailer visibility

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
        const movieImagesUrl = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`;
        const trailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

        // Making all API requests concurrently
        const [movieResponse, imagesResponse, trailerResponse] =
          await Promise.all([
            axios.get(movieUrl),
            axios.get(movieImagesUrl),
            axios.get(trailerUrl),
          ]);
        setMovieDetails(movieResponse.data);
        setMovieImages(imagesResponse.data.backdrops);

        // find official trailer which is on youtube
        const officialTrailer = trailerResponse.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailerUrl(
          officialTrailer
            ? `https://www.youtube.com/embed/${officialTrailer.key}`
            : ""
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div className="pt-20">
      {loading ? (
        <Loading />  // this component is run when resource are fetching from server.
      ) : (
        <>
           {/* this component show screenshots only when screenshots are  available at least 5,
           otherwise movieDetails component show by default screenshots if screenshots are less then 5 */}
          {movieImages.length > 5 && <Screenshots screenshots={movieImages} />}  
          <MovieDetails
            movieDetails={movieDetails}
            movieImages={movieImages}
            trailerUrl={trailerUrl}
            showTrailer={showTrailer}
            setShowTrailer={setShowTrailer}
          />
          
        </>
      )}
    </div>
  );
};

export default MovieDetailPage;
