import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SETVER_ENDPOINT}/api/v1/user`,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
        invalidatesTags:["User"]
      }),
    }),
    singup: build.mutation({
      query: ({ name, email, password }) => ({
        url: "/register",
        method: "POST",
        body: { name, email, password },
      }),
    }),
    getMyprofile: build.query({
      query: () => ({
        url: "/getuser",
        method: "GET",
        providesTags:["User"]
      }),
    }),
  }),
});

export const { useLoginMutation, useSingupMutation, useGetMyprofileQuery } =
  userApi;
