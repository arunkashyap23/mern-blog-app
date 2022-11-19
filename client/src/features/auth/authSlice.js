import { createSlice } from "@reduxjs/toolkit";

//get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateUserDispatch: (state, action) => {
      state.user = action.payload;
    },
    deleteUserDispatch: (state) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  register,
  login,
  logout,
  updateUserDispatch,
  deleteUserDispatch,
} = authSlice.actions;

export default authSlice.reducer;
