import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'; 

const store = configureStore({
  reducer: {
    user: userReducer, // this is user store that contain information about user Authentication
  },
});

export default store;
