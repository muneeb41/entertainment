import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/common/Header';
import SignUp from './pages/signup/SignUP';
import Home from './pages/home/Home';
import LogIn from './pages/login/LogIn';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux'; // Import Provider
import store from './redux/store';
import MoviePage from './pages/movie/MoviePage';
import TvShowPage from './pages/tvshow/TvShowPage';
import BookmarkPage from './pages/bookmark/BookmarkPage';
import NoPageFound from './pages/noPageFound/NoPageFound';
import MovieDetailPage from './pages/movieDetailPage/MovieDetailPage';
import TvShowDetailPage from './pages/tvShowDetailPage/TvShowDetailPage';

function App() {
  return (
    <Provider store={store}> {/* Wrap your Router with Provider */}
      <div className='overflow-x-hidden h-screen dark:bg-gray-700'>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/tvshows" element={<TvShowPage />} />
            <Route path="/bookmarks" element={<BookmarkPage />} />
            <Route path="/moviedetail/:id" element={<MovieDetailPage />} />
            <Route path="/tvshowdetail/:id" element={<TvShowDetailPage />} />
            <Route path="*" element={<NoPageFound />} />
          </Routes>
        </Router>
        {/* ToastContainer component to display notifications */}
        <ToastContainer position="top-center" theme="colored" autoClose={1000} />
      </div>
    </Provider>
  );
}

export default App;
