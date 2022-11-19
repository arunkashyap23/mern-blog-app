import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createPostDispatch: (state, action) => {
      state.post = action.payload;
    },
    updatePostDispatch: (state, action) => {
      state.post = action.payload;
    },
    deletePostDispatch: (state) => {
      state.post = null;
    },
    getAllPostDispatch: (state, action) => {
      state.post = action.payload;
    },
    getSinglePostDispatch: (state, action) => {
      state.post = [...state.post, action.payload];
    },
    removeSinglePost: (state, action) => {
      state.post = state.post.filter((item) => {
        return item.id !== action.payload._id;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createPostDispatch,
  updatePostDispatch,
  deletePostDispatch,
  getAllPostDispatch,
  getSinglePostDispatch,
  removeSinglePost,
} = postSlice.actions;

export default postSlice.reducer;
