import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  access_token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState, 
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
    },
    logout: (state) => {
      state.user = null;
      state.access_token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;