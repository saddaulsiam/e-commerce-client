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
      query: ({
        limit,
        page,
        sortBy,
        sortOrder,
        search,
        category,
        brand,
        color,
        status,
        minPrice,
        maxPrice,
        supplier,
      }) => {
        const params = new URLSearchParams();

        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);
        if (sortBy) params.append("sortBy", sortBy);
        if (sortOrder) params.append("sortOrder", sortOrder);
        if (search) params.append("search", search);
        if (category) params.append("category", category);
        if (brand) params.append("brand", brand);
        if (color) params.append("colors", color);
        if (status) params.append("status", status);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (supplier) params.append("supplier", supplier);

        return {
          url: `/products?${params.toString()}`,
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

    makeReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/review/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    changeProductStatus: builder.mutation({
      query: (payload) => ({
        url: `/products/${payload.id}/status`,
        method: "PUT",
        body: payload,
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
  useMakeReviewMutation,
  useChangeProductStatusMutation,
} = productApi;
