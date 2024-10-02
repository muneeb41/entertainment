import { createSlice } from '@reduxjs/toolkit';

// Helper function to get user data from local storage
const getUserFromLocalStorage = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : { email: null, token: null }; // Return default object if no user data found
};

// Get initial state from local storage
const initialState = getUserFromLocalStorage();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signup: (state,action) => {
        localStorage.setItem('user',JSON.stringify(action.payload))
        state.email = action.payload.email;
        state.token = action.payload.token;
    },
    login: (state, action) => {
        localStorage.setItem('user',JSON.stringify(action.payload));
        state.email = action.payload.email;
        state.token = action.payload.token;
    },
    logout: (state) => {
        localStorage.setItem('user',JSON.stringify({email:null,token:null}));
        state.email = null;
        state.token = null;
    },
  },
});

// Export actions and reducer
export const { signup, login, logout } = userSlice.actions;
export default userSlice.reducer;
