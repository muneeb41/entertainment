import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import serverApi from '../../api/serverApi';
import { useDispatch  } from 'react-redux';
import { signup } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/common/Loading';


const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      toast.warn('Passwords do not match!');
      return; // Prevent further execution if passwords don't match
    }
  
    try {
      setLoading(true);
      const response = await serverApi.post('/user/signup', formData);
      const { message ,email , token } = response.data;
  
      if (message === 'User Created Successfully') {
        toast.success('Sign Up Successfully!');
        dispatch(signup({email,token}))
        navigate('/')
      } else if (message === 'Server error') {
        toast.error('Server error');
      } else if (message === 'User already exists') {
        toast.warn('User already exists');
      } else {
        toast.info('Unexpected response from server');
      }
  
    } catch (error) {
        if (error.response && error.response.status === 400) {
            // Handle 400 errors (Bad Request)
            const { message } = error.response.data;
            toast.warn(message);
          } else {
            // Handle other errors (e.g., network issues)
            toast.error('Something went wrong! Please try again.');
            console.error('Error during sign-up:', error);
          }
    }finally{
      setLoading(false);
    }
  };

  if(loading) return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900'>
       <Loading />
    </div>
  )
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg  mt-52 sm:mt-10 box-shadow-main animate-slide-from-down">
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-100 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300"
            >
              Sign Up
            </button>
          </div>
          <div className="flex items-center justify-center gap-1 mb-8 flex-wrap">
          <p className="dark:text-[#fff] text-center">Already have an account?</p>
          <Link to="/login"
           className="dark:text-[#fc4747] text-blue-400 cursor-pointer hover:underline font-bold"
          >
                Login
          </Link>
        </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
