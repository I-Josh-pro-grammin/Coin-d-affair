import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  accountType: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.id = action.payload.id;
      state.accountType = action.payload.accountType;
    },
    logout: (state) => {
      state.id = null;
      state.accountType = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer; 