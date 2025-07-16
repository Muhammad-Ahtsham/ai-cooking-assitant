import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SETVER_ENDPOINT}/api/v1/history/`,
    credentials: "include",
  }),
  tagTypes: ["History"],

  endpoints: (build) => ({
    getHistory: build.query({
      query: () => ({
        url: "gethistory",
        method: "GET",
      }),
      providesTags: ["History"],
    }),
    createMessage: build.mutation({
      query: (body) => ({
        url: "message/createmessage",
        method: "POST",
        body,
      }),
      invalidatesTags: ["History"],
    }),
    deleteHistory: build.mutation({
      query: ({ id }) => ({
        url: `deletehistory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["History"],
    }),
  }),
});
export const {
  useGetHistoryQuery,
  useCreateHistoryMutation,
  useDeleteHistoryMutation,
} = api;
