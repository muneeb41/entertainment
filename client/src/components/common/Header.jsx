import React,{useEffect , useState} from 'react';
import blackLogo from '/blackLogo.png';
import blueLogo from '/blueLogo.png'
import { NavLink  } from 'react-router-dom';
import { PiSquaresFourFill } from 'react-icons/pi';
import { TbMovie } from "react-icons/tb";
import { PiTelevisionFill } from "react-icons/pi";
import { MdLightMode } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch , useSelector} from 'react-redux';
import { logout } from '../../redux/user/userSlice';
import { toast } from 'react-toastify';
import { TfiMenu } from "react-icons/tfi";
import { ImCross } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    //////////////////////////////////////////////////////// MANU SECTION //////////////////////////////////////////////
      const [isOpen ,setIsOpen] = useState(false);



    //////////////////////////////////////////////////////// DARK MODE SECTION //////////////////////////////////////////////
  // State for dark mode, defaulting to the value stored in localStorage
   const [isDark, setIsDark] = useState(() => {
    // Retrieve theme from localStorage and convert to boolean
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'true';
  });

  // Apply the 'dark' class on initial render based on localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]); // Apply the class whenever `isDark` changes

  const handleDarkToggle = () => {
    // Toggle dark mode
    document.documentElement.classList.toggle('dark');
    // Save the new theme preference in localStorage
    localStorage.setItem('theme', !isDark);
    // Update the state
    setIsDark(!isDark);
  };

    //////////////////////////////////////////////////////// IS USER LOGIN //////////////////////////////////////////////

    const isUserLogin = useSelector(state => state.user.email !== null);

    const handleLogout = ()=>{
      toast.success('logout successfully');
      setIsOpen(!isOpen)
      dispatch(logout());
      navigate('/login')
    }

  return (
    <nav className="bg-blue-500 z-20 mb-10 flex items-center justify-between p-2 flex-wrap gap-4 px-3 box-shadow-main fixed w-full dark:bg-gray-800 animate-slide-from-up">
      {/* ==================================== Logo section ============================================= */}
      <div className={`h-12 w-12 order-1 md:ml-3`}>
        <img src={isDark?blueLogo: blackLogo} alt="logo" />
      </div>

      {/* ===================================== Navigation links ================================== */}
      <div className="hidden  sm:flex space-x-4 flex-wrap justify-center  order-4 mt-2 mx-auto sm:order-2  ">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'text-blue-700 hover-scale font-bold' : 'text-gray-300 hover-scale')}
        >
          <PiSquaresFourFill className="text-white text-3xl mx-auto"  />
          <div className='text-sm' >Home</div>
        </NavLink>

        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? 'text-blue-700 hover-scale font-bold' : 'text-gray-300 hover-scale')}
        >
          <TbMovie className="text-white text-3xl mx-auto" />
          <div className='text-sm' >Movies</div>
        </NavLink>

        <NavLink
          to="/tvshows"
          className={({ isActive }) => (isActive ? 'text-blue-700 hover-scale font-bold' : 'text-gray-300 hover-scale')}
        >
          <PiTelevisionFill className="text-white text-3xl mx-auto" />
          <div className='text-sm' >TV Shows</div>
        </NavLink>

        <NavLink
          to="/bookmarks"
          className={({ isActive }) => (isActive ? 'text-blue-700 hover-scale font-bold' : 'text-gray-300 hover-scale')}
        >
          <FaBookmark className="text-white  text-3xl mx-auto" />
          <div className='text-sm' >Bookmarks</div>
        </NavLink>
      </div>
       
       {/*============================= dark mode button====================================== */}
       <div className={`flex items-center order-2  sm:order-3 md:mr-3`} >
            {/* Created a button to toggle between light mode and dark mode */}
            <MdLightMode  className="text-yellow-400 text-3xl mr-2" />    
            <label className="relative inline-flex items-center cursor-pointer">
                <input onClick={handleDarkToggle} type="checkbox" value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-blue-600 dark:bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-gray-800 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                </div>
            </label>
        </div>
        {/* ================================ AUTHENTICATION SECTION ====================================== */}
        <div className=' order-3 sm:order-4 md:mr-3 hover-scale hidden sm:inline-block'>
          {isUserLogin?(
               <NavLink
               to="/login"
               className={({ isActive }) => (isActive ? 'text-blue-700 hover-scale font-bold' : 'text-gray-300 hover-scale')}
               onClick={handleLogout}
             >
                 <IoLogOutOutline className="text-white text-4xl mx-auto" />
             </NavLink>
          ):(
             <NavLink
             to="/signup"
             className={({ isActive }) => (isActive ? 'text-blue-700 hover-scale font-bold' : 'text-gray-300 hover-scale')}
           >
               <FaCircleUser className="text-white text-4xl mx-auto" />
           </NavLink>
          )}
        </div>
         {/* ================================ MENU OPTION IN SMALL SCREEN ====================================== */}
         <div className="flex justify-between items-center order-3 sm:hidden">
        {isOpen ||  <div className="">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <TfiMenu  className=' text-2xl dark:text-white' />
          </button>
        </div> }
      
        {/* Mobile Menu (only visible when isOpen is true) */}
      <div className={` ${isOpen ? 'flex' : 'hidden'} mt-4  flex-row flex-wrap justify-center gap-3 text-lg`}>
        <div className='flex flex-col fixed  bg-gray-100 right-0  top-0 px-6 box-shadow-main rounded-xl py-4 space-y-2 font-semibold dark:bg-gray-800'>
         <ImCross className='text-xl text-center dark:text-white ' 
           onClick={()=>setIsOpen(!isOpen)}
         />
        <Link to="/" className="  text-center hover:text-blue-700 dark:text-white" onClick={()=>setIsOpen(!isOpen)}>Home</Link>
        <Link to="/movies" className="  text-center hover:text-blue-700 dark:text-white"  onClick={()=>setIsOpen(!isOpen)}>Movies</Link>
        <Link to="/tvshows" className="  text-center hover:text-blue-700 dark:text-white"  onClick={()=>setIsOpen(!isOpen)}>TV Shows</Link>
        <Link to="/bookmarks" className="  text-center hover:text-blue-700 dark:text-white" onClick={()=>setIsOpen(!isOpen)}>Bookmarks</Link>
        {isUserLogin?(<div  className="  text-center hover:text-blue-700 dark:text-white" onClick={handleLogout}>Log out</div>):(
          <Link to="/signup" className="  text-center hover:text-blue-700 dark:text-white"  onClick={()=>setIsOpen(!isOpen)}>Sign up</Link>
        )} 
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Header;
