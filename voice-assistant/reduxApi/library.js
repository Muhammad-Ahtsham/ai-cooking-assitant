import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const libraryApi = createApi({
  reducerPath: "library",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SETVER_ENDPOINT}/api/v1/library/`,
    credentials: "include",
  }),

  endpoints: (build) => ({
    getlibraryitem: build.query({
      query: () => ({
        url: "getlibraryitem",
        method: "GET",
      }),
    }),
    addtoLibrary: build.mutation({
      query: (itemId) => ({
        url: "addtolibrary",
        method: "POST",
        body: {itemId},
      }),
    }),
  }),
});

export const { useAddtoLibraryMutation, useGetlibraryitemQuery } = libraryApi;
