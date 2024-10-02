import React,{useState,useEffect} from 'react'
import serverApi from '../../api/serverApi';
import { useSelector } from 'react-redux';
import Loading from '../common/Loading';
import MovieCart from '../common/MovieCart';


const MovieBookmarks = () => {
    const [movies,setMovies] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false)
    const {email} = useSelector(state => state.user);

     useEffect(()=>{
        const fetchData = async()=>{
            try {
                setLoading(true);
                const response = await serverApi.get('/movie/bookmark',{params:{email:email}});
                setMovies(response.data);
            } catch (error) {
                console.log(error)
                setError(true)
            }finally{
                setLoading(false)
            }
        }
        fetchData()
     },[])


    if (loading) return <Loading/>
    if(error) return  <p className='text-xl  font-bold  text-center py-5 dark:text-white lg:text-3xl  lg:pb-8'>No Movie Bookmarks found.</p>
  return (
    <div className='bg-white dark:bg-gray-700'>
    <h2 className='text-xl font-bold ml-3 py-5 dark:text-white lg:text-3xl lg:ml-6 lg:pb-8 animate-slide-from-left'>
        Movie Bookmarks
    </h2>
    <div className='flex flex-row justify-center flex-wrap gap-2 animate-slide-from-right' >
        {movies.length > 0 ? (
            movies.map((movie,index) => (
                <div
                key={`${movie.id}-${index}`}
                className='box-shadow-main rounded-xl bg-white dark:bg-gray-800 mx-3 mb-4  max-w-36 sm:max-w-40 lg:max-w-48'
                >
                     <MovieCart   movie={movie} setMovies={setMovies}/>
                </div>
            ))
        ) : (
            <p className='text-xl  font-bold  mx-auto py-5 dark:text-white lg:text-3xl  lg:pb-8'>No movie bookmarks found.</p>
        )}
    </div>
</div>
  )
}

export default MovieBookmarks