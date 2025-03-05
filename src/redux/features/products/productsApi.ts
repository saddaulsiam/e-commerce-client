import baseApi from "../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/product/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
    }),

    getProducts: builder.query({
      query: (data) => ({
        url: `/product?limit=${data.limit}&page=${data.page}&sort=${data.sort}`,
        method: "GET",
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
      }),
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductsBySearchMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
