import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = 'https://coin-d-affaires-backend.vercel.app/' || 'http://localhost:5000';

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

    // Admin Endpoints
    getAdminStats: builder.query({
      query: () => ({
        url: '/api/',
        method: 'GET',
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: '/api/users',
        method: 'GET',
      }),
    }),

    // Auth Endpoints (Verify Email)
    verifyEmail: builder.query({
      query: (token) => ({
        url: `/api/auth/verify/${token}`,
        method: 'GET',
      }),
    }),

    // Business Endpoints
    createBusiness: builder.mutation({
      query: (data) => ({
        url: '/api/business/create-business',
        method: 'POST',
        body: data,
      }),
    }),
    updateBusiness: builder.mutation({
      query: (data) => ({
        url: '/api/business',
        method: 'PATCH',
        body: data,
      }),
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: '/api/business/add-product',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Listings'],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, ...data }) => ({
        url: `/api/business/update-product/${productId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Listings', id: arg.productId }],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/business/delete-product/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Listings'],
    }),
    getBusinessProfile: builder.query({
      query: () => ({
        url: '/api/business/business-profile',
        method: 'GET',
      }),
    }),
    getBusinessProducts: builder.query({
      query: () => ({
        url: '/api/business/business-products-post',
        method: 'GET',
      }),
    }),

    // Cart Endpoints
    createCart: builder.mutation({
      query: () => ({
        url: '/api/cart/create-cart',
        method: 'POST',
      }),
    }),
    addItemToCart: builder.mutation({
      query: (data) => ({
        url: '/api/cart/add-item-to-cart',
        method: 'POST',
        body: data,
      }),
    }),
    getCart: builder.query({
      query: (cartId) => ({
        url: `/api/cart/get-cart/${cartId}`,
        method: 'GET',
      }),
    }),
    getCartItem: builder.query({
      query: (cartItemId) => ({
        url: `/api/cart/get-cart-item/${cartItemId}`,
        method: 'GET',
      }),
    }),
    removeItemFromCart: builder.mutation({
      query: (cartItem) => ({
        url: `/api/cart/remove-item/${cartItem}`,
        method: 'DELETE',
      }),
    }),

    // Category Endpoints (Expanded)
    createCategory: builder.mutation({
      query: (data) => ({
        url: '/api/category/create-category',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Categories'],
    }),
    createSubCategory: builder.mutation({
      query: (data) => ({
        url: '/api/category/create-subcategory',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Categories'],
    }),
    getSubCategory: builder.query({
      query: () => ({
        url: '/api/category/get-subcategory',
        method: 'GET',
      }),
    }),
    getSubcategoriesByCategorySlug: builder.query({
      query: (slug) => ({
        url: `/api/category/slug/${slug}/subcategories`,
        method: 'GET',
      }),
    }),

    // Order Endpoints
    createOrder: builder.mutation({
      query: (data) => ({
        url: '/api/orders/create-order',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Orders'],
    }),
    getOrders: builder.query({
      query: () => ({
        url: '/api/orders/get-orders',
        method: 'GET',
      }),
      providesTags: ['Orders'],
    }),
    getOrderStats: builder.query({
      query: () => ({
        url: '/api/orders/get-orders/stats',
        method: 'GET',
      }),
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/api/orders/get-order/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Orders', id }],
    }),
    updateOrder: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/orders/update-order/${id}`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Orders'],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/api/orders/delete-order/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Orders'],
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
  // Admin
  useGetAdminStatsQuery,
  useGetAllUsersQuery,
  // Auth
  useVerifyEmailQuery,
  // Business
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetBusinessProfileQuery,
  useGetBusinessProductsQuery,
  // Cart
  useCreateCartMutation,
  useAddItemToCartMutation,
  useGetCartQuery,
  useGetCartItemQuery,
  useRemoveItemFromCartMutation,
  // Category
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useGetSubCategoryQuery,
  useGetSubcategoriesByCategorySlugQuery,
  // Order
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderStatsQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = apiSlice;
