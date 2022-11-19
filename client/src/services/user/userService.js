import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/users/" }),
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ userId, token, ...others }) => {
        console.log(token);
        return {
          url: `/${userId}`,
          method: "PUT",
          body: others,
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deleteUser: builder.mutation({
      query: (dataForDelete) => {
        return {
          url: `/${dataForDelete.userId}`,
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${dataForDelete.token}`,
          },
        };
      },
    }),
    getUser: builder.query({
      query: (user) => {
        return {
          url: `/${user._id}`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUpdateUserMutation, useDeleteUserMutation, useGetUserQuery } =
  userApi;
