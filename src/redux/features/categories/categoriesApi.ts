import Cookies from "js-cookie";
import baseApi from "../api/baseApi";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
