import Cookies from "js-cookie";
import baseApi from "../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBrands: builder.mutation({
      query: (data) => ({
        url: "/brand",
        method: "POST",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
        body: data,
      }),
    }),
    getBrands: builder.query({
      query: () => ({
        url: "/brand",
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
      }),
    }),
  }),
});

export const { useCreateBrandsMutation, useGetBrandsQuery } = productApi;
