import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.access_token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Auth', 'Listings', 'Categories'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: '/api/auth/register',
        method: 'POST',
        body: payload,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: '/api/auth/me',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
    getListings: builder.query({
      query: (params = {}) => ({
        url: '/api/products/get-products',
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result?.listings
          ? [
            ...result.listings.map((listing) => ({
              type: 'Listings',
              id: listing.listings_id,
            })),
            { type: 'Listings', id: 'LIST' },
          ]
          : [{ type: 'Listings', id: 'LIST' }],
    }),
    getListing: builder.query({
      query: (listingId) => ({
        url: `/api/products/${listingId}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Listings', id: arg }],
    }),
    getCategories: builder.query({
      query: () => ({
        url: '/api/category',
        method: 'GET',
      }),
      providesTags: ['Categories'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useGetListingsQuery,
  useGetListingQuery,
  useGetCategoriesQuery,
} = apiSlice;
