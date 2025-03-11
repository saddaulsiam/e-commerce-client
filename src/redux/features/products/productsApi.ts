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

    getAllProducts: builder.query({
      query: ({ limit, page, sort, search, category }) => {
        const url = `/products?`;
        const params = new URLSearchParams();

        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);
        if (sort) params.append("sort", sort);
        if (search) params.append("search", search);
        if (category) params.append("category", category);

        return {
          url: `${url}${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),

    getProductsBySearch: builder.query({
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
      providesTags: ["Products"],
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetProductsBySearchQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
