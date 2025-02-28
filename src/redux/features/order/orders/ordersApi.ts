import baseApi from "../../api/baseApi";

const orderNowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    orderNow: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",

        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrders: builder.query({
      query: (data) => ({
        url: `/orders?limit=${data.limit}&page=${data.page}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getMyOrders: builder.query({
      query: (email) => ({
        url: `/orders/my/${email}`,
        method: "GET",
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
