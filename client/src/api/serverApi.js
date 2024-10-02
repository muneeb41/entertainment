import axios from 'axios';

// Create an instance of axios with the base URL from environment variables
const serverApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

// Add a request interceptor to include the token in the headers if it exists
serverApi.interceptors.request.use(config => {
  const userData = JSON.parse(localStorage.getItem('user') || 'null'); // Retrieve user data from local storage
  const token = userData ? userData.token : null; // Extract token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
  }
  
  return config; // Return the modified config
});

export default serverApi;
