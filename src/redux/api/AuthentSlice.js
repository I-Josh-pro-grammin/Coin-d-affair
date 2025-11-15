import { apiSlice } from "./apiSlice.jsx";

const USER_URL = "/users";
const AUTH_URL = "/auth";
const PROFILE_URL = "/profile-image";

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
        url: `${AUTH_URL}/login`,
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
  useLoginUserMutation,
  useRegisterMutation
} = authentSlice;