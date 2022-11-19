import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";
import postsReducer from "../features/post/postSlice";
import { authApi } from "../services/auth/authService";
import { userApi } from "../services/user/userService";
import { postApi } from "../services/post/postService";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(postApi.middleware),
});

setupListeners(store.dispatch);
