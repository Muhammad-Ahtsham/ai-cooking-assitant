import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messageApi = createApi({
  reducerPath: "messages",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SETVER_ENDPOINT}/api/v1/`,
    credentials: "include",
  }),
  tagTypes: ["Messages"],
  endpoints: (build) => ({
  getMessage: build.query({
    query: (historyId) => ({
      url: `message/getmessage/${historyId}`, 
      method: "GET",
      
    }),
    providesTags:["Messages"]
  }),
    createMessage: build.mutation({
      query: (body) => ({
        url: "message/createmessage",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Messages"],
    }),

    contentGenerator: build.mutation({
      query: ({ content, data }) => ({
        url: "genai/generate",
        method: "POST",
        body: { content, data },
      }),
    }),
  }),
});

export const {
  useGetMessageQuery,
  useCreateMessageMutation,
  useContentGeneratorMutation,
} = messageApi;
