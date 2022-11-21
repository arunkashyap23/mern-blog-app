import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/posts/" }),
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: (query) => {
        // console.log(query);
        return {
          url: query ? query : "/",
          method: "GET",
        };
      },
    }),
    getSinglePost: builder.query({
      query: (_id) => {
        return {
          url: `/${_id}`,
          method: "GET",
        };
      },
    }),
    createPost: builder.mutation({
      query: ({ token, ...data }) => {
        return {
          url: `/`,
          method: "POST",
          body: data,
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    updatePost: builder.mutation({
      query: ({ id, token, ...others }) => {
        return {
          url: `/${id}`,
          method: "PUT",
          body: others,
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deletePost: builder.mutation({
      query: ({ id, token, ...others }) => {
        return {
          url: `/${id}`,
          method: "DELETE",
          body: others,
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllPostQuery,
  useGetSinglePostQuery,
  useDeletePostMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
} = postApi;
