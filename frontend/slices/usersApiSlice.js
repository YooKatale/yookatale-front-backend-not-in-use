// "use client";

import axios from "axios";
import { apiSlice } from "./apiSlice";

const USERS_URL = "https://yookatale-server-app.onrender.com/api";

// const USERS_URL = "http://localhost:8000/api";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/users/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/users/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/users/logout`,
        method: "POST",
      }),
    }),
    productsGet: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/products`,
        method: "GET",
      }),
    }),
    productGet: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/product/${data}`,
        method: "GET",
      }),
    }),
    productsCategoryGet: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/products/${data}`,
        method: "GET",
      }),
    }),
    productsFilterGet: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/products/filter/${data}`,
        method: "GET",
      }),
    }),
    cartCreate: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/product/cart`,
        method: "POST",
        body: data,
      }),
    }),
    cart: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/product/cart/${data}`,
        method: "GET",
      }),
    }),
    cartDelete: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/product/cart/${data}`,
        method: "DELETE",
      }),
    }),
    search: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/products/search/${data}`,
        method: "GET",
      }),
    }),
    newOrder: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/products/order`,
        method: "POST",
        body: data,
      }),
    }),
    orders: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/products/order/${data}`,
        method: "GET",
      }),
    }),
    commentsGet: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/users/comments`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProductsCategoryGetMutation,
  useProductsGetMutation,
  useCartCreateMutation,
  useProductGetMutation,
  useCartMutation,
  useCartDeleteMutation,
  useProductsFilterGetMutation,
  useSearchMutation,
  useNewOrderMutation,
  useOrdersMutation,
  useCommentsGetMutation,
} = usersApiSlice;
