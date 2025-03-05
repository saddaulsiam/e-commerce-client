import baseApi from "../api/baseApi";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    getCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    getCategoryById: builder.query({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
} = categoriesApi;
