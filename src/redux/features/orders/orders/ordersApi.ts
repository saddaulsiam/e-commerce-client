import Cookies from "js-cookie";
import baseApi from "../../api/baseApi";

const orderNowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    orderNow: builder.mutation({
      query: (data) => ({
        url: "/order",
        method: "POST",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrders: builder.query({
      query: (data) => ({
        url: `/order?limit=${data.limit}&page=${data.page}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
      }),
      providesTags: ["Orders"],
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
      }),
      providesTags: ["Orders"],
    }),
    getMyOrders: builder.query({
      query: (email) => ({
        url: `/order/my/${email}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useOrderNowMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useGetSingleOrderQuery,
} = orderNowApi;
