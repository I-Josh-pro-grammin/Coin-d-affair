import { apiSlice } from "./apiSlice.js";

const USER_URL = "/api/users";
const AUTH_URL = "/api/auth";
const PROFILE_URL = "/api/profile-image";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `/api/auth/login`,
        method: "POST",
        body: data,
      }),
    }),

    getCurrentUser: builder.query({
      query: () => ({
        url: '/auth/get-me',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useLoginMutation,
  useRegisterMutation
} = userApiSlice;