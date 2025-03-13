import baseApi from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerVendor: builder.mutation({
      query: (data) => ({
        url: "/vendor",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vendor"],
    }),

    getMyVendor: builder.query({
      query: (userId) => ({
        url: `/vendor/${userId}`,
        method: "GET",
      }),
      providesTags: ["Vendor"],
    }),

    getVendorOrders: builder.query({
      query: ({ limit, page, sort, search, vendorId, status }) => {
        const url = `/orders/vendor?`;
        const params = new URLSearchParams();

        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);
        if (sort) params.append("sort", sort);
        if (search) params.append("search", search);
        if (vendorId) params.append("vendorId", vendorId);
        if (status) params.append("status", status);

        return {
          url: `${url}${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Vendor"],
    }),

    getVendorCustomers: builder.query({
      query: ({ limit, page, sort, search, vendorId, status }) => {
        const url = `/vendor/${vendorId}/customers?`;
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
      providesTags: ["Vendor"],
    }),

    getDashboardMeta: builder.query({
      query: () => ({
        url: "/vendor/dashboard/meta",
        method: "GET",
      }),
      providesTags: ["Vendor"],
    }),

    updateMyVendor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/vendor/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Vendor"],
    }),

    // deleteVendor: builder.mutation({
    //   query: (email) => ({
    //     url: `/vendor/${email}`,
    //     method: "DELETE",
    //   }),
    // }),

    // getVendorByName: builder.query({
    //   query: ({ name }) => ({
    //     url: `/vendor/${name}`,
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const {
  useRegisterVendorMutation,
  useGetMyVendorQuery,
  useGetVendorOrdersQuery,
  useGetVendorCustomersQuery,
  useGetDashboardMetaQuery,
  useUpdateMyVendorMutation,
  // useDeleteVendorMutation,
  // useGetVendorByNameQuery,
} = authApi;
