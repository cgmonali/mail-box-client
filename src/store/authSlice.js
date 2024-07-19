// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Retrieve the initial token from localStorage
const initialToken = localStorage.getItem('token');
const initialEmail = localStorage.getItem('email');



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!initialToken, // If token exists, user is considered logged in
    token: initialToken,
    registeredEmail: initialEmail,
    inboxUnreadCount: 0,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.registeredEmail = action.payload.email;
      localStorage.setItem('token', action.payload.token); // Save token to localStorage
      localStorage.setItem('email', action.payload.email);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.registeredEmail= null;
      localStorage.removeItem('token'); // Remove token from localStorage
      localStorage.removeItem('email');
    },
    updateCount: (state, action) => {
      state.inboxUnreadCount = action.payload;
    },
  },
});

export const { login, logout,updateCount } = authSlice.actions;
export default authSlice.reducer;
