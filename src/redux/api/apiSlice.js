import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

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
        url: '/api/admin/stats',
        method: 'GET',
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: '/api/admin/users',
        method: 'GET',
      }),
    }),
    getAdminBusinesses: builder.query({
      query: () => ({
        url: '/api/admin/businesses',
        method: 'GET',
      }),
    }),
    getAdminListings: builder.query({
      query: () => ({
        url: '/api/admin/listings',
        method: 'GET',
      }),
    }),
    getAdminOrders: builder.query({
      query: (params) => ({
        url: '/api/admin/orders',
        method: 'GET',
        params,
      }),
    }),
    getAdminOrderDetails: builder.query({
      query: (orderId) => ({
        url: `/api/admin/order/${orderId}`,
        method: 'GET',
      }),
    }),
    updateAdminOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/api/admin/order/${orderId}/status`,
        method: 'POST',
        body: { status },
      }),
    }),

    // Admin User Management
    getAdminUserDetails: builder.query({
      query: (userId) => ({
        url: `/api/admin/user/${userId}`,
        method: 'GET',
      }),
    }),
    banUser: builder.mutation({
      query: (userId) => ({
        url: `/api/admin/user/${userId}/ban`,
        method: 'POST',
      }),
    }),
    unbanUser: builder.mutation({
      query: (userId) => ({
        url: `/api/admin/user/${userId}/unban`,
        method: 'POST',
      }),
    }),

    // Admin Listing Management
    updateListingStatus: builder.mutation({
      query: ({ listingId, action }) => ({
        url: `/api/admin/listing/${listingId}/status`,
        method: 'POST',
        body: { action },
      }),
    }),
    deleteAdminListing: builder.mutation({
      query: (listingId) => ({
        url: `/api/admin/listing/${listingId}`,
        method: 'DELETE',
      }),
    }),

    // Admin Subscriptions
    getSubscriptionStats: builder.query({
      query: () => ({
        url: '/api/admin/subscriptions/stats',
        method: 'GET',
      }),
    }),
    getSubscriptionsList: builder.query({
      query: (params) => ({
        url: '/api/admin/subscriptions',
        method: 'GET',
        params,
      }),
    }),

    // Admin Logs & Notifications
    getAdminLogs: builder.query({
      query: (params) => ({
        url: '/api/admin/logs',
        method: 'GET',
        params,
      }),
    }),
    getAdminNotifications: builder.query({
      query: (params) => ({
        url: '/api/admin/notifications',
        method: 'GET',
        params,
      }),
    }),
    createAdminNotification: builder.mutation({
      query: (data) => ({
        url: '/api/admin/notifications',
        method: 'POST',
        body: data,
      }),
    }),
    markNotificationRead: builder.mutation({
      query: (notificationId) => ({
        url: `/api/admin/notification/${notificationId}/read`,
        method: 'POST',
      }),
    }),

    // Auth Endpoints (Verify Email)
    verifyEmail: builder.query({
      query: (token) => ({
        url: `/api/auth/verify/${token}`,
        method: 'GET',
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/api/auth/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    createCheckoutSession: builder.mutation({
      query: (data) => ({
        url: '/api/payment/create-checkout-session',
        method: 'POST',
        body: data,
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
        url: '/api/business/update-profile',
        method: 'PATCH',
        body: data,
      }),
    }),
    addProduct: builder.mutation({
      query: (formData) => ({
        url: '/api/business/add-product',
        method: 'POST',
        body: formData,
        // Important: Let browser set Content-Type to multipart/form-data with boundary
        headers: {
          // Do NOT set Content-Type manually when using FormData!
          // 'Content-Type': 'multipart/form-data' → WRONG when using FormData
        },
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
    getBusinessTransactions: builder.query({
      query: () => ({
        url: '/api/business/transactions',
        method: 'GET',
      }),
    }),
    getBusinessOrders: builder.query({
      query: () => ({
        url: '/api/business/business-orders',
        method: 'GET',
      }),
    }),
    getLocations: builder.query({
      query: () => ({
        url: '/api/business/locations',
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
  useUpdateProfileMutation,
  useCreateCheckoutSessionMutation,
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
  useGetBusinessTransactionsQuery,
  useGetBusinessOrdersQuery,
  useGetAdminBusinessesQuery,
  useGetAdminListingsQuery,
  useGetAdminOrdersQuery,
  useGetAdminOrderDetailsQuery,
  useUpdateAdminOrderStatusMutation,
  useGetAdminUserDetailsQuery,
  useBanUserMutation,
  useUnbanUserMutation,
  useUpdateListingStatusMutation,
  useDeleteAdminListingMutation,
  useGetSubscriptionStatsQuery,
  useGetSubscriptionsListQuery,
  useGetAdminLogsQuery,
  useGetAdminNotificationsQuery,
  useCreateAdminNotificationMutation,
  useMarkNotificationReadMutation,
  useGetLocationsQuery,
} = apiSlice;
