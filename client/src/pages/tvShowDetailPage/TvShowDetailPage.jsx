import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/common/Loading'
import TvShowDetails from '../../components/tvShowdetails/TvShowDetails.jsx'
import { useState , useEffect } from 'react'
import axios from 'axios'
import Screenshots from '../../components/common/Screenshots.jsx'

const TvShowDetailPage = () => {
    const {id} = useParams()
    const apiKey = "db872527da4bcbbee43595ff4d4767a7";
  const [loading, setLoading] = useState(false);
  const [tvSeriesDetails, setTvSeriesDetails] = useState(null);
  const [tvSeriesImages, setTvSeriesImages] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false); // State to control trailer visibility

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const tvUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`;
        const tvImagesUrl = `https://api.themoviedb.org/3/tv/${id}/images?api_key=${apiKey}`;
        const trailerUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}`;

        // Making all API requests concurrently
        const [tvResponse, imagesResponse, trailerResponse] =
          await Promise.all([
            axios.get(tvUrl),
            axios.get(tvImagesUrl),
            axios.get(trailerUrl),
          ]);
          
        setTvSeriesDetails(tvResponse.data)
        setTvSeriesImages(imagesResponse.data.backdrops.slice(0,12));

         // find official trailer which is on youtube
        const officialTrailer = trailerResponse.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailerUrl(officialTrailer ? `https://www.youtube.com/embed/${officialTrailer.key}` : "");
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
    <div className="pt-20 ">
      {loading ? (
        <Loading />
      ) : (
        <>
             {/* this component show screenshots only when screenshots are  available at least 5,
           otherwise movieDetails component show by default screenshots if screenshots are less then 5 */}
            {tvSeriesImages.length > 4 && <Screenshots screenshots={tvSeriesImages} />}
            <TvShowDetails
              tvSeriesDetails={tvSeriesDetails} tvSeriesImages={tvSeriesImages} trailerUrl={trailerUrl}  
               showTrailer={showTrailer}  setShowTrailer={setShowTrailer}
              />
        </>      
      )}
    </div>
  )
}

export default TvShowDetailPage