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

    getAllOrders: builder.query({
      query: ({ limit, page, sort, search, status }) => {
        const url = `/orders?`;
        const params = new URLSearchParams();

        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);
        if (sort) params.append("sort", sort);
        if (search) params.append("search", search);
        if (status) params.append("status", status);

        return {
          url: `${url}${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Orders"],
    }),

    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    getSingleSuborder: builder.query({
      query: (id) => ({
        url: `/orders/suborder/${id}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: "/orders/my",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),

    updateSubOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/suborder/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useOrderNowMutation,
  useGetSingleOrderQuery,
  useGetSingleSuborderQuery,
  useGetMyOrdersQuery,
  useUpdateOrderStatusMutation,
  useUpdateSubOrderStatusMutation,
} = orderNowApi;
