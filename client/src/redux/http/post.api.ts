import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
  }),
  tagTypes: ['News', 'Comment', 'Category'],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (id) => ({
        url: `/news`,
        method: 'GET',
      }),
    }),
    getCategory: builder.query({
      query: (id) => ({
        url: '/category',
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),
    createPost: builder.mutation({
      query: (body) => {
        return {
          url: '/news',
          method: 'post',
          body,
          providesTags: ['News'],
        };
      },
      invalidatesTags: ['News'],
    }),
    deletePost: builder.mutation({
      query: (newsId) => {
        return {
          url: `/news/${newsId}`,
          method: 'delete',
          providesTags: ['News'],
        };
      },
      invalidatesTags: ['News'],
    }),
    getAuthorPosts: builder.query<any, void>({
      query: (id) => ({
        url: `/news/user/${id}`,
        method: 'GET',
      }),
      providesTags: ['News'],
    }),
    getComments: builder.query({
      query: (id) => ({
        url: `/comment/${id}`,
        method: 'get',
      }),
      providesTags: ['Comment'],
    }),
    createComment: builder.mutation({
      query: (body) => ({
        url: '/comment',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});
export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAuthorPostsQuery,
  useGetCategoryQuery,
  useGetCommentsQuery,
  useCreateCommentMutation,
} = postApi;
