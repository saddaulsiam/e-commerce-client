import Cookies from "js-cookie";
import baseApi from "../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/product/${data.id}`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
        body: data.data,
      }),
    }),

    getProducts: builder.query({
      query: (data) => ({
        url: `/product?limit=${data.limit}&page=${data.page}&sort=${data.sort}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
      }),
      providesTags: ["Products"],
    }),

    getProductsBySearch: builder.mutation({
      query: (data) => ({
        url: `/product?limit=${data.limit}&page=${data.page}&sort=${data.sort}${
          data.search
            ? `&search=${data.search}`
            : data.category
            ? `&category.name=${data.category}`
            : ""
        }`,
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
      }),
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsBySearchMutation,
  useCreateProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
